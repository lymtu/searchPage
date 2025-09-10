import { shortcutStore } from "@/lib/store/shortcutStore";
import { debounce } from "./debounce";

let windowSize = {
  width: window.innerWidth,
  height: window.innerHeight,
};

export const editBoxAppearHandle = (dom, id) => {
  const rect = dom.getBoundingClientRect();
  shortcutStore.setEditShow(true, {
    ...shortcutStore.shortcutList[id],
    id,
    rect,
    windowSize,
  });
};

const resizeHandle = debounce(() => {
  windowSize = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
});

window.addEventListener("resize", resizeHandle);
