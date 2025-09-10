<script setup>
import { shortcutStore } from "@/lib/store/shortcutStore";
import classifyManageBox from "./classifyManageBox.vue";

const classify = defineModel();

const deleteHandle = (delClassify) => {
  shortcutStore.deleteClassifyItem(delClassify);
  if (delClassify === classify.value.value)
    classify.value = { label: "全部", value: "" };
};

const submitHandle = (e) => {
  const formData = new FormData(e.target);
  const value = formData.get("value");
  const label = formData.get("label");
  if (value === "" || label === "") return;
  shortcutStore.addClassifyItem(label, value);
  e.target.reset();
};

defineOptions({
  name: "ClassifySelector",
});
</script>

<template>
  <div class="classify-selector">
    <div class="placeholder">
      <svg
        width="24"
        height="24"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="6"
          y="28"
          width="36"
          height="14"
          rx="4"
          stroke="#333"
          stroke-width="4"
        />
        <path
          d="M20 7H10C7.79086 7 6 8.79086 6 11V17C6 19.2091 7.79086 21 10 21H20"
          stroke="#333"
          stroke-width="4"
          stroke-linecap="round"
        />
        <circle
          cx="34"
          cy="14"
          r="8"
          fill="none"
          stroke="#333"
          stroke-width="4"
        />
        <circle cx="34" cy="14" r="3" fill="#333" />
      </svg>
      <span> 分类：{{ classify.value === "" ? "全部" : classify.label }} </span>
    </div>

    <div class="options">
      <div
        class="item"
        v-for="value in shortcutStore.classifyList"
        @click="classify = value"
      >
        <span>
          {{ value.label }}
        </span>
        <svg
          @click.stop="deleteHandle(value.value)"
          width="24"
          height="24"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 8L40 40"
            stroke="#000000"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8 40L40 8"
            stroke="#000000"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div class="add-classify">
        <p>添加新的分类</p>
        <classifyManageBox @submit="submitHandle" class="classify-manage-box" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.classify-selector {
  position: relative;
  user-select: none;
}

.classify-selector div.placeholder {
  width: 150px;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding: 0.25rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
  transition-property: background-color, box-shadow, transform;
  outline: none;
  border: none;
  background-color: transparent;
}

.classify-selector div.placeholder svg {
  flex: 0 0 auto;
}
.classify-selector div.placeholder span {
  flex: 0 1 auto;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.classify-selector:hover div.placeholder {
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
}

.classify-selector:hover > .options {
  display: block;
}

.options {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 5px;
}

.options > div {
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition-property: background-color, color, transform;
  border-radius: 5px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.options > div.item {
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.options > div.item svg {
  width: 16px;
  height: 16px;
  transition: transform 0.2s ease-in-out;
}

.options > div.item svg:hover {
  transform: rotate(180deg);
}

.options > div.item:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.options > div.item:active {
  background-color: rgba(255, 255, 255, 0.5);
  color: #333;
  transform: scale(0.95);
}

.options > div.add-classify {
  position: relative;
}
.options > div.add-classify:hover > .classify-manage-box {
  display: block;
}

.options .classify-manage-box {
  cursor: auto;
  display: none;
  position: absolute;
  top: 50%;
  left: 0;
  translate: -100% -50%;
}
</style>
