<script setup>
import {
  useTemplateRef,
  onMounted,
  onUnmounted,
  watch,
  ref,
  nextTick,
} from "vue";
import { animationCurve } from "@/lib/utils/animationCurve";
import { debounce } from "@/lib/utils/debounce";
import { shortcutStore, shortcutDockerList } from "@/lib/store/shortcutStore";
import { InputStore } from "@/lib/store/inputStore";

import StoreSvgUrl from "/store.svg?url";

const shortcutDockerRef = useTemplateRef("shortcutDocker");
const isDockerFillNull = ref(false);
let domList = [];
let requestAnimationFrameId = null;

const clickHandle = (link, name) => {
  window.open(link, name);
};

const mouseMove = (e) => {
  if (requestAnimationFrameId) {
    cancelAnimationFrame(requestAnimationFrameId);
  }
  const x = e.clientX;
  requestAnimationFrameId = requestAnimationFrame(() => {
    for (let i = 0; i < domList.length; i++) {
      const scale = animationCurve(x - domList[i].pos);
      domList[i].el.style.setProperty("--i", scale);
      domList[i].el.style.setProperty("transition", "all 100ms");
    }
  });
};

const mouseLeave = () => {
  if (requestAnimationFrameId) {
    cancelAnimationFrame(requestAnimationFrameId);
  }
  requestAnimationFrameId = requestAnimationFrame(() => {
    for (let i = 0; i < domList.length; i++) {
      domList[i].el.style.setProperty("--i", 1);
      domList[i].el.style.setProperty("transition", "all 0.25s");
    }
  });
};

const setRect = () => {
  const domList_ = shortcutDockerRef.value.querySelectorAll(".item,.gap");
  domList = [];

  for (let i = 0; i < domList_.length; i++) {
    const el = domList_[i];
    const rect = el.getBoundingClientRect();
    domList.push({
      el,
      pos: rect.x + rect.width / 2,
    });
  }
};

const setRect_debounce = debounce(setRect, 300);

watch(
  () => shortcutStore.dockerList,
  async () => {
    if (shortcutStore.dockerList.some((item) => item !== null)) {
      isDockerFillNull.value = false;
    } else {
      isDockerFillNull.value = true;
    }
    
    await nextTick();
    setRect();
  },
  { deep: true, immediate: true}
);

onMounted(() => {
  setRect();

  shortcutDockerRef.value.addEventListener("mousemove", mouseMove);
  shortcutDockerRef.value.addEventListener("mouseleave", mouseLeave);
  window.addEventListener("resize", setRect_debounce);
});

onUnmounted(() => {
  shortcutDockerRef.value.removeEventListener("mousemove", mouseMove);
  shortcutDockerRef.value.removeEventListener("mouseleave", mouseLeave);
  window.removeEventListener("resize", setRect_debounce);
});

defineOptions({
  name: "shortcutDocker",
});
</script>

<template>
  <Transition name="docker">
    <div
      class="shortcut-button-docker-container"
      v-show="!InputStore.isFocus && !isDockerFillNull"
    >
      <div class="shortcut-button-docker" ref="shortcutDocker">
        <div class="gap" :style="{ '--i': 1, transition: 'all 0.25s' }"></div>
        <template v-for="(value, key) in shortcutDockerList" :key="key">
          <div
            class="item"
            :title="value.name"
            :style="{
              '--i': 1,
              transition: 'all 0.25s',
              backgroundColor: value.containerBg,
            }"
            @click="clickHandle(value.url, value.name)"
          >
            <img
              :style="value.style"
              class="icon"
              :src="value.imgSrc"
              alt="加载失败"
            />
          </div>
          <div class="gap" :style="{ '--i': 1, transition: 'all 0.25s' }"></div>
        </template>

        <div
          class="item more"
          :style="{ '--i': 1, transition: 'all 0.25s' }"
          @click="shortcutStore.setContainerShow(true)"
        >
          <img class="icon" :src="StoreSvgUrl" />
        </div>
        <div class="gap" :style="{ '--i': 1, transition: 'all 0.25s' }"></div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.shortcut-button-docker-container {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
}

.shortcut-button-docker {
  --gap-proportion: 6;
  --margin-bottom-proportion: 8;
  display: flex;
  align-items: end;
  width: fit-content;
  height: calc(
    var(--shortcut-docker-item-size, 4rem) *
      (1 + 2 / var(--margin-bottom-proportion))
  );
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.5);
  transition: transform 0.25s, width 0.25s;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.shortcut-button-docker-container:hover .shortcut-button-docker {
  transform: translate(0, -10px);
}

.shortcut-button-docker .gap,
.shortcut-button-docker .item {
  height: calc(var(--shortcut-docker-item-size, 4rem) * var(--i, 1));
  margin-bottom: calc(
    var(--shortcut-docker-item-size, 4rem) / var(--margin-bottom-proportion) *
      var(--i, 1)
  );
}

.shortcut-button-docker .gap {
  width: calc(
    var(--shortcut-docker-item-size, 4rem) / var(--gap-proportion, 4) *
      var(--i, 1)
  );
}

.shortcut-button-docker .item {
  width: calc(var(--shortcut-docker-item-size, 4rem) * var(--i, 1));
  overflow: hidden;
  border-radius: 20%;
  background-color: #fff;
  cursor: pointer;
}

.shortcut-button-docker .item.more {
  display: flex;
  justify-content: center;
  align-items: center;
}

.shortcut-button-docker .item .icon {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.docker-enter-active,
.docker-leave-active {
  transition: transform 100ms ease-out;
}

.docker-enter-from,
.docker-leave-to {
  transform: translate(-50%, 125%) scale(1.25);
}
</style>
