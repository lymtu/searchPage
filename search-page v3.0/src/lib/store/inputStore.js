import { reactive, computed, readonly } from "vue";

import BingPngUrl from "/bing-logo.png?url";
import BaiduPngUrl from "/baidu-logo.png?url";

const localStorageKey = "searchEngine";
// const localEngineList = JSON.parse(localStorage.getItem(localStorageKey)) || {
//   0: {
//     name: "bing",
//     image: BingPngUrl,
//     url: "https://www4.bing.com/search?q=${keyword}$",
//   },
//   1: {
//     name: "百度",
//     image: BaiduPngUrl,
//     url: "https://www.baidu.com/s?wd=${keyword}$",
//   },
// };

const localEngineList = {
  0: {
    name: "bing",
    image: BingPngUrl,
    url: "https://www4.bing.com/search?q=${keyword}$",
  },
  1: {
    name: "百度",
    image: BaiduPngUrl,
    url: "https://www.baidu.com/s?wd=${keyword}$",
  },
};

const InputStoreOrigin = reactive({
  isFocus: false,
  setFocus: (value) => {
    InputStoreOrigin.isFocus = value;
  },
  searchEngineList: localEngineList,
  selectedEngine: "0",
  setSelectedEngine: (value) => {
    InputStoreOrigin.selectedEngine = value;
  },
});

export const selectedEngineInfo = computed(() => {
  return InputStoreOrigin.searchEngineList[InputStoreOrigin.selectedEngine];
});

export const assiciationApi = (keyword) =>
  "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=" + keyword;

export const InputStore = readonly(InputStoreOrigin);

window.addEventListener("beforeunload", () => {
  localStorage.setItem(
    localStorageKey,
    JSON.stringify(InputStoreOrigin.searchEngineList)
  );
});
