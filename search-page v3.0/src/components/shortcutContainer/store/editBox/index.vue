<script setup>
import maskLayer from "@/components/maskLayer.vue";
import { shortcutStore } from "@/lib/store/shortcutStore";
import editBoxMenu from "./menu.vue";

import { computed, ref, watch } from "vue";

const edit_name = ref("");
const edit_url = ref("");
const edit_classify = ref("");
const edit_imgSrc = ref("");
const menuStyle = ref({});

const edit_style_translate_x = ref(0);
const edit_style_translate_y = ref(0);
const edit_style_scale = ref(1);
const edit_style_bg_color = ref("#ffffff");

let menuWidth = 500;
let menuHeight = 400;

watch(
  () => shortcutStore.editInfo,
  (value) => {
    if (value?.id) {
      edit_name.value = value.name;
      edit_url.value = value.url;
      edit_classify.value = value.classify;
      edit_imgSrc.value = value.imgSrc;

      const translate = value.style?.translate?.split(" ");
      edit_style_translate_x.value = translate?.[0]?.replace("px", "") || 0;
      edit_style_translate_y.value = translate?.[1]?.replace("px", "") || 0;
      edit_style_scale.value = value.style?.scale || 1;
      edit_style_bg_color.value = value.containerBg || "#ffffff";
    }

    if (!value.id) {
      menuStyle.value = {
        top: "100%",
        left: "50%",
        transform: "translate(-50%, 0)",
      };
      return;
    }

    let left = value.rect.width + "px";
    let top = "0px";

    const noRightSpace =
      value.windowSize.width - value.rect.x - value.rect.width < menuWidth;
    const noBottomSpace =
      value.windowSize.height - value.rect.y - value.rect.height < menuHeight;

    if (noRightSpace && value.rect.x >= menuWidth) {
      left = -1 * menuWidth - 5 + "px";
    }

    if (noBottomSpace && value.rect.y >= menuHeight) {
      top = -1 * menuHeight - 5 + "px";
    }

    menuStyle.value = {
      top,
      left,
    };
  },
  { immediate: true }
);

const edit_style = computed(() => {
  return {
    translate:
      edit_style_translate_x.value +
      "px " +
      edit_style_translate_y.value +
      "px",
    scale: edit_style_scale.value,
  };
});

const submitHandle = () => {
  if (
    !edit_name.value ||
    !edit_url.value ||
    !edit_imgSrc.value ||
    !edit_style_bg_color.value
  ) {
    return;
  }

  shortcutStore.updateItem(shortcutStore.editInfo.id, {
    name: edit_name.value,
    url: edit_url.value,
    style: edit_style.value,
    containerBg: edit_style_bg_color.value,
    imgSrc: edit_imgSrc.value,
    classify: edit_classify.value,
  });

  shortcutStore.setEditShow(false);
};

const deleteHandle = () => {
  shortcutStore.removeItem(shortcutStore.editInfo.id);
  shortcutStore.setEditShow(false);
};

const closeHandle = () => {
  const { id, name, url, imgSrc } = shortcutStore.editInfo;

  if (!name && !url && !imgSrc) {
    shortcutStore.removeItem(id);
  }
  shortcutStore.setEditShow(false);
};

defineOptions({
  name: "editBox",
});
</script>

<template>
  <maskLayer :isShow="shortcutStore.isEditShow" @close="closeHandle">
    <div class="editBox">
      <div
        class="item"
        v-show="shortcutStore.editInfo.id"
        :style="{
          top: (shortcutStore.editInfo.rect?.top || 0) / 1.1 + 'px',
          left: (shortcutStore.editInfo.rect?.left || 0) / 1.1 + 'px',
        }"
      >
        <div
          class="icon-container"
          :style="{ backgroundColor: edit_style_bg_color }"
        >
          <img
            :src="edit_imgSrc"
            :style="{
              ...edit_style,
              display: edit_imgSrc ? 'block' : 'none',
            }"
            alt="加载失败"
          />
        </div>
        <editBoxMenu
          @cancel="closeHandle"
          @submit="submitHandle"
          @delete="deleteHandle"
          :classifyList="
            shortcutStore.classifyList.filter((item) => item.value !== '')
          "
          :style="menuStyle"
          v-model:name="edit_name"
          v-model:url="edit_url"
          v-model:classify="edit_classify"
          v-model:imgSrc="edit_imgSrc"
          v-model:bgColor="edit_style_bg_color"
          v-model:translateX="edit_style_translate_x"
          v-model:translateY="edit_style_translate_y"
          v-model:scale="edit_style_scale"
        />
      </div>
    </div>
  </maskLayer>
</template>

<style scoped>
.item {
  position: absolute;
  width: var(--shortcut-docker-item-size, 4rem);
  height: var(--shortcut-docker-item-size, 4rem);
}

.item .icon-container {
  background-color: #fff;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
}

.item .icon-container img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
</style>
