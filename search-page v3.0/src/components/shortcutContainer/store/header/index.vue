<script setup>
import ClassifySelector from "./classifySelector.vue";

const dockerList = defineModel("dockerList");
const isDockerShow = defineModel("isDockerShow");
const isSave = defineModel("isSave");
const classify = defineModel("classify");

defineEmits(["addShortcut"]);

const clearDocker = () => {
  dockerList.value = new Array(8).fill(null);
};

defineOptions({
  name: "shortcutHeader",
});
</script>

<template>
  <div class="header">
    <div class="btn-container">
      <button @click="isDockerShow = !isDockerShow">
        <svg
          width="24"
          height="24"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 42H43"
            stroke="#333"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M11 26.7199V34H18.3172L39 13.3081L31.6951 6L11 26.7199Z"
            fill="none"
            stroke="#333"
            stroke-width="4"
            stroke-linejoin="round"
          />
        </svg>
        {{ isDockerShow ? "隐藏底部容器" : "编辑底部容器" }}
      </button>

      <template v-if="isDockerShow">
        <button @click="isSave = true" v-if="!isSave">保存</button>
        <button @click="isSave = false" v-else>取消保存</button>

        <button @click="clearDocker">清除</button>
      </template>
    </div>

    <div class="btn-container">
      <button @click="$emit('addShortcut')">
        <svg
          width="24"
          height="24"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 6H8C6.89543 6 6 6.89543 6 8V16"
            stroke="#333"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16 42H8C6.89543 42 6 41.1046 6 40V32"
            stroke="#333"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M32 42H40C41.1046 42 42 41.1046 42 40V32"
            stroke="#333"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M32 6H40C41.1046 6 42 6.89543 42 8V16"
            stroke="#333"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M32 24L16 24"
            stroke="#333"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M24 32L24 16"
            stroke="#333"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        添加
      </button>
      <ClassifySelector v-model="classify" />
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
}

.btn-container {
  display: flex;
  gap: 1rem;
}

button {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
  transition-property: background-color, box-shadow, transform;
  outline: none;
  border: none;
  background-color: transparent;
}

button:hover {
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
}

button:active {
  background-color: rgba(232, 232, 232, 0.6);
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
  transform: scale(0.9);
}
</style>
