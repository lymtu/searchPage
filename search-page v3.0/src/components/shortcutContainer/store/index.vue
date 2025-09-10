<script setup>
import maskLayer from "@/components/maskLayer.vue";
import shortcutHeader from "./header/index.vue";
import DockerEditor from "./docker-editor.vue";
import editBox from "./editBox/index.vue";
import { editBoxAppearHandle } from "@/lib/utils/editBoxAppearHandle";
import { shortcutStore } from "@/lib/store/shortcutStore";
import {
  ref,
  watch,
  useTemplateRef,
  nextTick,
  onMounted,
  onUnmounted,
} from "vue";

const isDockerShow = ref(false);
const isSave = ref(false);
const classify = ref({
  label: "全部",
  value: "",
});
const bodyRef = useTemplateRef("body");

const dragData = ref(null);
const dockerList = ref([]);

watch(
  () => shortcutStore.dockerList,
  (val) => {
    dockerList.value = [...val];
  },
  { immediate: true, deep: true }
);

watch(
  () => shortcutStore.isContainerShow,
  (val) => {
    // 关闭且保存
    if (!val && isSave.value) {
      shortcutStore.setDockerList(dockerList.value);
      isSave.value = false;
      return;
    }

    // 关闭且未保存
    if (!val && !isSave.value) {
      dockerList.value = [...shortcutStore.dockerList];
      return;
    }
  }
);

const closeHandle = () => {
  shortcutStore.setContainerShow(false);
  isDockerShow.value = false;
  window.removeEventListener("keydown", globalKeydownCloseHandle);
};

const dragStartHandle = (e, item) => {
  e.target.classList.add("dragging");
  e.dataTransfer.effectAllowed = "copy";
  dragData.value = item;
};

const dragEndHandle = (e) => {
  e.target.classList.remove("dragging");
};

const jump = (url, name) => {
  if (isDockerShow.value) return;
  window.open(url, name);
};

const addShortcut = async () => {
  const id = Date.now().toString();
  shortcutStore.updateItem(id, {
    name: "",
    url: "",
    style: {},
    containerBg: "#ffffff",
    imgSrc: "",
    classify: "none",
  });

  await nextTick();

  const newItem = bodyRef.value.querySelector(".item:last-child");
  newItem.scrollIntoView({ behavior: "smooth" });
  editBoxAppearHandle(newItem, id);
};

const globalKeydownCloseHandle = (e) => {
  if (e.key === "Escape") {
    e.preventDefault();
    shortcutStore.setContainerShow(false);
  }
};

const globalKeydownOpenHandle = (e) => {
  if (e.key === "s" && e.ctrlKey) {
    e.preventDefault();
    shortcutStore.setContainerShow(true);
    window.addEventListener("keydown", globalKeydownCloseHandle, {
      once: true,
    });
  }
};

onMounted(() => {
  window.addEventListener("keydown", globalKeydownOpenHandle);
});

onUnmounted(() => {
  window.removeEventListener("keydown", globalKeydownOpenHandle);
  window.removeEventListener("keydown", globalKeydownCloseHandle);
});

defineOptions({
  name: "shortcutStore",
});
</script>

<template>
  <mask-layer @close="closeHandle" :isShow="shortcutStore.isContainerShow">
    <Transition name="shortcutStoreContainer">
      <div
        class="shortcutStoreContainer"
        v-show="shortcutStore.isContainerShow"
      >
        <shortcut-header
          v-model:dockerList="dockerList"
          v-model:isDockerShow="isDockerShow"
          v-model:isSave="isSave"
          v-model:classify="classify"
          @addShortcut="addShortcut"
        />
        <div class="body" ref="body">
          <template
            v-for="(value, key) in shortcutStore.shortcutList"
            :key="key"
          >
            <div
              class="item"
              v-if="classify.value === '' || value.classify === classify.value"
              @click="jump(value.url, value.name)"
            >
              <div
                class="icon-container"
                :draggable="isDockerShow"
                @contextmenu.prevent="editBoxAppearHandle($event.target, key)"
                @dragstart="dragStartHandle($event, { id: key, ...value })"
                @dragend="dragEndHandle($event)"
                :style="{ backgroundColor: value.containerBg }"
              >
                <img
                  :src="value.imgSrc"
                  :style="{
                    ...value.style,
                    display: value.imgSrc ? 'block' : 'none',
                  }"
                  alt="加载失败"
                />
              </div>
              <p class="title">
                {{ value.name }}
              </p>
            </div>
          </template>
        </div>
        <Transition name="docker-editor">
          <DockerEditor
            v-model:dragData="dragData"
            v-if="isDockerShow"
            :storeList="shortcutStore.shortcutList"
            v-model:list="dockerList"
          />
        </Transition>
      </div>
    </Transition>
    <editBox />
  </mask-layer>
</template>

<style scoped>
.shortcutStoreContainer {
  max-width: 80%;
  width: fit-content;
  height: 60%;
  min-height: 500px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}

.shortcutStoreContainer .body {
  flex-grow: 1;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 1rem;
  padding: 1rem 2rem;
  height: 100%;
  overflow-y: scroll;
}

@media screen and (min-width: 1280px) {
  .shortcutStoreContainer .body {
    grid-template-columns: repeat(10, 1fr);
  }
}

@media screen and (min-width: 1500px) {
  .shortcutStoreContainer .body {
    column-gap: 2rem;
    grid-template-columns: repeat(12, 1fr);
  }
}

.shortcutStoreContainer .body::-webkit-scrollbar {
  display: none;
}

.shortcutStoreContainer .body .item {
  width: var(--shortcut-docker-item-size, 4rem);
  height: fit-content;
  margin: 0 auto;
  cursor: pointer;
}

.shortcutStoreContainer .body .item .icon-container {
  background-color: #fff;
  width: 100%;
  height: var(--shortcut-docker-item-size, 4rem);
  border-radius: 10px;
  overflow: hidden;
}
.shortcutStoreContainer .body .item .icon-container.dragging {
  opacity: 0.5;
  border-radius: 10px;
  overflow: hidden;
}

.shortcutStoreContainer .body .item .icon-container img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  pointer-events: none;
}

.shortcutStoreContainer .body .item .title {
  width: var(--shortcut-docker-item-size, 4rem);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-align: center;
  font-size: 0.8rem;
  margin-top: 0.25rem;
}

@media screen and (min-width: 1500px) {
  .shortcutStoreContainer .body .item .title {
    font-size: 1rem;
  }
}

.shortcutStoreContainer-enter-active,
.shortcutStoreContainer-leave-active {
  transition: transform 100ms;
  transform: translateY(-20px);
}

.shortcutStoreContainer-enter-from,
.shortcutStoreContainer-leave-to {
  transform: translateY(20px);
}

.docker-editor-enter-active,
.docker-editor-leave-active {
  transition: transform 100ms;
  transform: translateX(-50%) translateY(-20px);
}

.docker-editor-enter-from,
.docker-editor-leave-to {
  transform: translateX(-50%) translateY(20px);
}
</style>
