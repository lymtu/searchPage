<script setup>
import { computed, ref } from "vue";

const props = defineProps(["storeList"]);

const list = defineModel("list");
const dragData = defineModel("dragData");

const dropHandle = (index) => {
  const originIndex = dragData.value.index;
  if (index === -1) {
    if (originIndex === undefined || originIndex === null) return;
    list.value[originIndex] = null;
    dragData.value = null;
    return;
  }

  const id = dragData.value.id;
  if (!id) return;

  const isAlreadyInList = list.value.some((id_) => id_ === id);

  if (isAlreadyInList && originIndex === undefined) return;

  if (isAlreadyInList) {
    const targetId = list.value[index];
    list.value[originIndex] = targetId;
  }
  list.value[index] = id;

  dragData.value = null;
};

const renderList = computed(() => {
  const list_ = [];
  list.value.forEach((id) => {
    if (id) {
      list_.push({ ...props.storeList[id], id });
      return;
    }

    list_.push(null);
  });
  return list_;
});

const showDeleteBox = ref(false);

const onDragStart = (e, value) => {
  dragData.value = value;
  // 让原元素半透明
  e.target.style.opacity = 0.4;
  e.dataTransfer.dropEffect = "move";
  e.dataTransfer.effectAllowed = "move";
  showDeleteBox.value = true;
};

const onDragEnd = (e) => {
  e.target.style.opacity = 1;
  showDeleteBox.value = false;
};

defineOptions({
  name: "docker-editor",
});
</script>

<template>
  <div class="docker-editor-container">
    <div
      v-for="(item, index) of renderList"
      :key="item?.id ?? index"
      @dragenter="(e) => e.preventDefault()"
      @dragover="(e) => e.preventDefault()"
      @drop="dropHandle(index)"
    >
      <div
        class="item"
        v-if="item !== null"
        draggable="true"
        @dragstart="onDragStart($event, { index, id: item.id })"
        @dragend="onDragEnd"
        :style="{ backgroundColor: item.containerBg }"
      >
        <img class="icon" :style="item.style" :src="item.imgSrc" alt="" />
      </div>
      <div class="item empty" v-else>
        <span>+</span>
      </div>
    </div>

    <div
      class="item empty delete"
      v-show="showDeleteBox"
      @dragenter="(e) => e.preventDefault()"
      @dragover="(e) => e.preventDefault()"
      @drop="dropHandle(-1)"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 10V44H39V10H9Z"
          fill="none"
          stroke-width="4"
          stroke-linejoin="round"
        />
        <path
          d="M20 20V33"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M28 20V33"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M4 10H44"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M16 10L19.289 4H28.7771L32 10H16Z"
          fill="none"
          stroke-width="4"
          stroke-linejoin="round"
        />
      </svg>
      <span>删除</span>
    </div>
  </div>
</template>

<style scoped>
.docker-editor-container {
  width: fit-content;
  height: fit-content;
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%) translateY(0%);
  display: flex;
  gap: calc(var(--shortcut-docker-item-size, 4rem) / var(--gap-proportion, 4));
  align-items: center;
}

.docker-editor-container .item {
  height: calc(var(--shortcut-docker-item-size, 4rem) * var(--i, 1));
  margin-bottom: calc(
    var(--shortcut-docker-item-size, 4rem) / var(--margin-bottom-proportion) *
      var(--i, 1)
  );
  width: calc(var(--shortcut-docker-item-size, 4rem));
  overflow: hidden;
  border-radius: 20%;
  background-color: #fff;
  cursor: pointer;
}
.docker-editor-container .item.empty {
  border-radius: 5px;
  border: 2px currentColor dashed;
  background-color: transparent;
  color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
}

.docker-editor-container .item.empty.delete {
  flex-direction: column;
  color: red;
  position: absolute;
  right: calc(
    -1 * var(--shortcut-docker-item-size, 4rem) / var(--gap-proportion, 4)
  );
  bottom: 0;
  transform: translateX(100%) translateY(0);
}

.docker-editor-container .item.empty.delete.enter {
  background-color: rgb(248, 33, 33);
}

.docker-editor-container .item.empty.delete svg {
  color: inherit;
  stroke: currentColor;
}

.docker-editor-container .item .icon {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
</style>
