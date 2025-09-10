<script setup>
defineEmits(["close"]);

const props = defineProps(["isShow"]);

defineOptions({
  name: "maskLayer",
});
</script>

<template>
  <teleport to="#root">
      <div class="mask-layer" v-show="isShow">
        <div @click.self="$emit('close')" class="mask-locator">
          <slot></slot>
        </div>
      </div>
  </teleport>
</template>

<style scoped>
.mask-layer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(5px);
  transform: scale(1.1);
}

.mask-locator {
  width: calc(100% / 1.1);
  height: calc(100% / 1.1);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
