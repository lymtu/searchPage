import { reactive, readonly, computed } from "vue";

const localStorageKey = "shortcutStore";

const shortcutStoreLocal = JSON.parse(localStorage.getItem(localStorageKey));

const shortcutStoreOrigin = reactive({
  isContainerShow: false,
  setContainerShow: (value) => {
    shortcutStoreOrigin.isContainerShow = value;
  },

  isEditShow: false,
  editInfo: {},
  setEditShow: (value, info = {}) => {
    shortcutStoreOrigin.isEditShow = value;
    shortcutStoreOrigin.editInfo = info;
  },

  shortcutList: shortcutStoreLocal?.shortcutList || {},

  removeItem: (id) => {
    const index = shortcutStoreOrigin.dockerList.indexOf(id);
    if (index !== -1) {
      shortcutStoreOrigin.dockerList[index] = null;
    }

    delete shortcutStoreOrigin.shortcutList[id];
  },
  updateItem: (id, shortcut) => {
    shortcutStoreOrigin.shortcutList[id] = {
      ...shortcutStoreOrigin.shortcutList[id],
      ...shortcut,
    };
  },

  classifyList: shortcutStoreLocal?.classifyList || [
    { label: "全部", value: "" },
    { label: "web", value: "web" },
    { label: "未分类", value: "none" },
  ],

  deleteClassifyItem: (classify) => {
    shortcutStoreOrigin.classifyList = shortcutStoreOrigin.classifyList.filter(
      (item) => item.value !== classify
    );

    for (const key in shortcutStoreOrigin.shortcutList) {
      if (shortcutStoreOrigin.shortcutList[key].classify === classify) {
        shortcutStoreOrigin.shortcutList[key].classify = "none";
      }
    }
  },
  addClassifyItem: (label, classify) => {
    shortcutStoreOrigin.classifyList.push({ label, value: classify });
  },

  dockerList:
    shortcutStoreLocal?.dockerList.length === 8
      ? shortcutStoreLocal.dockerList
      : new Array(8).fill(null),
  setDockerList: (list) => {
    shortcutStoreOrigin.dockerList = list;
  },
});

export const shortcutDockerList = computed(() => {
  const list = [];
  shortcutStoreOrigin.dockerList.forEach((id) => {
    id && list.push({ ...shortcutStoreOrigin.shortcutList[id], id });
  });

  return list;
});

export const shortcutStore = readonly(shortcutStoreOrigin);

window.addEventListener("beforeunload", () => {
  localStorage.setItem(
    localStorageKey,
    JSON.stringify({
      shortcutList: shortcutStoreOrigin.shortcutList,
      dockerList: shortcutStoreOrigin.dockerList,
      classifyList: shortcutStoreOrigin.classifyList,
    })
  );
})
