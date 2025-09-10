<script setup>
import { useTemplateRef } from "vue";
import { shortcutStore } from "@/lib/store/shortcutStore";

const input = defineModel("value");
const index = defineModel("index");

const props = defineProps(["selectAssociation", "associationListLength"]);

let isComposition = false;

const inputDom = useTemplateRef("searchInput");

// 中文输入结束处理
const compositionendHandle = (e) => {
  isComposition = false;
  input.value = e.target.value;
};

// 输入处理
const inputHandle = (e) => {
  if (isComposition) return;
  input.value = e.target.value;
};

// 上下选择联想
const selectAssociationHandle = (num) => {
  if (index.value === -1) {
    if (num > 0) {
      index.value = 0;
    } else {
      index.value = props.associationListLength - 1;
    }
    return;
  }

  let targetIndex = index.value + num;
  if (targetIndex < 0) {
    targetIndex = props.associationListLength - 1;
  } else if (targetIndex >= props.associationListLength) {
    targetIndex = 0;
  }
  index.value = targetIndex;
};

window.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "f" && !shortcutStore.isContainerShow) {
    e.preventDefault();
    inputDom.value.focus();
  }
});

defineOptions({
  name: "InputDom",
});

defineEmits(["update:isFocus"]);
</script>

<template>
  <input
    ref="searchInput"
    :value="selectAssociation || input"
    @input="inputHandle"
    @compositionstart="isComposition = true"
    @compositionend="compositionendHandle"
    @keydown.up.prevent="selectAssociationHandle(-1)"
    @keydown.down.prevent="selectAssociationHandle(1)"
    autocomplete="off"
    type="text"
    name="search"
    @focus="$emit('update:isFocus', true)"
    @blur="$emit('update:isFocus', false)"
  />
</template>

<style scoped></style>
