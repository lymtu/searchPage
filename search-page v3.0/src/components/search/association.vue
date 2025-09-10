<script setup>
const props = defineProps(["associationList", "selectIndex", "isFocus"]);

defineEmits(["search"]);

defineOptions({
  name: "Association",
});
</script>

<template>
  <Transition name="association-transition">
    <div
      :class="['container', props.associationList.length > 0 && 'fill']"
      v-show="props.isFocus"
    >
      <div>
        <div
          @click="$emit('search', item)"
          onmousedown="return false"
          :class="['item', props.selectIndex === index && 'active']"
          v-for="(item, index) in props.associationList"
          :key="item"
        >
          <div class="text">{{ item }}</div>
          <span class="svg">
            <svg
              width="24"
              height="24"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 14L8 22L16 30"
                stroke="#000000"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M40 38V25C40 23.3431 38.6569 22 37 22H8"
                stroke="#000000"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.container {
  width: 35rem;
  height: fit-content;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0.5rem;
  backdrop-filter: blur(5px);
  overflow: hidden;
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 100ms;
}

.container.fill {
  grid-template-rows: 1fr;
}

.container.fill > * {
  min-height: 0px;
}

.item {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
}

.item.active,
.item:hover {
  background-color: rgba(255, 255, 255, 0.5);
}

.text {
  font-weight: 600;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.association-transition-enter-active,
.association-transition-leave-active {
  transition-duration: 0.25s;
}

.association-transition-enter-from,
.association-transition-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-10px) scale(0.9);
}
</style>
