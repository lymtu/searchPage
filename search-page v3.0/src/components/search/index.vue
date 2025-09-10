<script setup>
import SearchSvgUrl from "/search.svg?url";

import { ref, watch, computed } from "vue";
import {
  InputStore,
  selectedEngineInfo,
  assiciationApi,
} from "@/lib/store/inputStore";

import SearchEngineBox from "./searchEngineBox.vue";
import Association from "./association.vue";
import InputDom from "./inputDom.vue";

const isFocus = ref(false);
const input = ref(""); // 用户输入内容
const selectIndex = ref(-1); // 选中联想词的索引
const associationList = ref([]);

let associationListCache = {};
let timeoutId = null;

const jsonp = async (keyword) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = assiciationApi(keyword);
    document.head.appendChild(script);
    script.onload = () => {
      script.remove();
    };
    try {
      window.baidu = {
        sug: (json) => {
          associationListCache[keyword] = json.s;
          resolve();
        },
      };
    } catch (error) {
      reject(error);
    }
  });
};

const selectAssociation = computed(() => {
  return associationList.value[selectIndex.value];
});

watch(isFocus, (newVal) => {
  InputStore.setFocus(newVal);

  if (newVal) {
  } else {
    selectIndex.value = -1;
    associationListCache = {};

    if (selectAssociation.value) {
      input.value = selectAssociation.value;
    }
  }
});

watch(input, (newVal) => {
  clearTimeout(timeoutId);
  selectIndex.value = -1;
  if (newVal) {
    timeoutId = setTimeout(async () => {
      await jsonp(newVal);
      associationList.value = associationListCache[newVal] || [];
    }, 500);
  } else {
    associationList.value = [];
  }
});

const submitHandle = (value) => {
  if (!value && !input.value) return;
  const searchParams = value || input.value;
  const searchUrl = selectedEngineInfo.value.url.replace(
    "${keyword}$",
    searchParams
  );
  window.open(searchUrl, searchParams);
};
</script>

<template>
  <div class="inputBox" :class="{ focus: isFocus }">
    <Transition name="searchEngineBox-transition">
      <SearchEngineBox v-show="isFocus" />
    </Transition>
    <form action="" @submit.prevent="submitHandle(selectAssociation || input)">
      <InputDom
        v-model:value="input"
        v-model:index="selectIndex"
        :selectAssociation="selectAssociation"
        @update:isFocus="(val) => (isFocus = val)"
        :associationListLength="associationList.length"
      />
      <button type="submit" onmousedown="return false">
        <img :src="SearchSvgUrl" alt="图片加载失败" />
      </button>
    </form>
  </div>

  <Association
    @search="submitHandle"
    :isFocus="isFocus"
    :selectIndex="selectIndex"
    :associationList="associationList"
  />
</template>

<style scoped>
.inputBox {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, 0);
  width: fit-content;
  height: 2.5rem;
  display: flex;
  /* align-items: center; */
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 2.5rem;
  transition-property: background-color, backdrop-filter, transform;
  transition-duration: 0.25s;
}

.searchEngineBox {
  width: 4rem;
  height: 100%;
  border-radius: 2.5rem 0 0 2.5rem;
  --size: 2rem;
  --margin: 0.2rem;
  transition: background-color 0.25s;
}

.searchEngineBox:hover {
  background-color: rgba(255, 255, 255, 0.5);
}

form {
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: inherit;
}

input {
  width: 25rem;
  height: 100%;
  padding: 10px 20px;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 1.25rem;
  transition: width 0.25s;
}

.inputBox.focus {
  transform: translate(-50%, -100%);
  backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, 0.75);
}

.inputBox.focus input {
  width: 30rem;
  padding: 10px 5px;
}

button {
  height: 100%;
  width: 4rem;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  transition: background-color 0.25s;
}

button:hover {
  background-color: rgba(255, 255, 255, 0.5);
}

.searchEngineBox-transition-enter-active,
.searchEngineBox-transition-leave-active {
  transition: opacity 0.25s, width 100ms;
}

.searchEngineBox-transition-enter-from,
.searchEngineBox-transition-leave-to {
  width: 0;
  opacity: 0;
}
</style>
