<script setup>
import { InputStore } from "@/lib/store/inputStore";
import BackgroundJpgUrl from "/background.jpg?url";
</script>

<template>
  <div :class="['bgContainer', InputStore.isFocus ? 'focus' : '']">
    <img
      :src="BackgroundJpgUrl"
      alt="图片加载失败"
    />
    <div class="bg-mask" v-show="InputStore.isFocus"></div>
  </div>
</template>

<style scoped>
.bgContainer {
  width: 100%;
  height: 100%;
}

.bgContainer img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.25s ease-in-out;
  transform-origin: center 30%;
}

.bgContainer.focus img {
  transform: scale(1.15);
}

.bg-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  /* background: linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.5) 100%); */
  backdrop-filter: blur(5px);
}
</style>
