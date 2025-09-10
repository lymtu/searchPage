<script setup>
const props = defineProps(["style", "classifyList"]);

const name = defineModel("name");
const url = defineModel("url");
const classify = defineModel("classify");
const imgSrc = defineModel("imgSrc");
const bgColor = defineModel("bgColor");
const translateX = defineModel("translateX");
const translateY = defineModel("translateY");
const scale = defineModel("scale");

defineEmits(["submit", "cancel", "delete"]);

defineOptions({
  name: "editBoxMenu",
});
</script>

<template>
  <div class="menu" :style="props.style">
    <form action="" @submit.prevent="$emit('submit', $event)">
      <div class="form-item">
        <div>
          <label for="edit_name">名称：</label>
          <input
            type="text"
            id="edit_name"
            name="name"
            v-model="name"
            placeholder="请输入名称"
          />
        </div>

        <div>
          <label for="edit_classify">分类</label>
          <select name="classify" id="edit_classify" v-model="classify">
            <option
              v-for="classify_ in props.classifyList"
              :key="classify_.value"
              :value="classify_.value"
            >
              {{ classify_.label }}
            </option>
          </select>
        </div>
      </div>
      <div class="form-item">
        <label for="edit_url">链接：</label>
        <input
          type="text"
          id="edit_url"
          name="url"
          v-model="url"
          placeholder="请输入链接"
        />
      </div>
      <div class="form-item">
        <label for="edit_imgSrc">图片：</label>
        <input
          type="text"
          id="edit_imgSrc"
          name="imgSrc"
          v-model="imgSrc"
          placeholder="请输入图片链接"
        />
      </div>
      <div class="form-item style-edit">
        <div>
          <label for="edit_style_bg_color">背景色：</label>
          <input
            type="color"
            name="containerBg"
            id="edit_style_bg_color"
            v-model="bgColor"
          />
        </div>

        <div>
          <label for="edit_style_translate_x">X轴：</label>
          <input
            type="range"
            name="translateX"
            id="edit_style_translate_x"
            v-model="translateX"
            step="1"
            min="-100"
            max="100"
          />
        </div>

        <div>
          <label for="edit_style_translate_y">Y轴：</label>
          <input
            type="range"
            name="translateY"
            id="edit_style_translate_y"
            v-model="translateY"
            step="1"
            min="-100"
            max="100"
          />
        </div>

        <div>
          <label for="edit_style_scale">缩放：</label>
          <input
            type="range"
            name="scale"
            id="edit_style_scale"
            v-model="scale"
            step="0.1"
            min="0"
            max="3"
          />
        </div>
      </div>

      <div class="btn-group">
        <button type="button" class="delete" @click="$emit('delete')">
          删除
        </button>
        <div>
          <button type="button" @click="$emit('cancel')">取消</button>
          <button type="submit">保存</button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.menu {
  width: 500px;
  height: 400px;
  position: absolute;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  padding: 20px;
}

.menu form {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.menu form .form-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.menu form .form-item:nth-child(1) {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.menu form .form-item:nth-child(1) > div {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.menu form .form-item:nth-child(1) select,
.menu form .form-item:nth-child(1) input {
  width: 200px;
  display: block;
  flex: 1;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
}

.menu form .form-item:first div {
  width: fit-content;
}

.menu form .form-item.style-edit {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
}

.menu form .form-item.style-edit div {
  display: flex;
  align-items: center;
  margin: auto;
}

.menu form input[type="text"] {
  display: block;
  flex: 1;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
}

.menu form input[type="range"] {
  height: 5px;
  appearance: none;
  -webkit-appearance: none;
}
.menu form input[type="range"]:focus {
  outline: none;
}
.menu form input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 5px;
  cursor: pointer;
  box-shadow: 0px 0px 0px #000000;
  background: #ffffff;
  border-radius: 25px;
  border: 1px solid #8a8a8a;
}
.menu form input[type="range"]::-webkit-slider-thumb {
  box-shadow: 1px 1px 1px #828282;
  border: 1px solid #8a8a8a;
  height: 9px;
  width: 35px;
  border-radius: 6px;
  background: #dadada;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -2px;
}
.menu form input[type="range"]::-moz-range-track {
  width: 100%;
  height: 5px;
  cursor: pointer;
  box-shadow: 0px 0px 0px #000000;
  background: #ffffff;
  border-radius: 25px;
  border: 1px solid #8a8a8a;
}
.menu form input[type="range"]::-moz-range-thumb {
  box-shadow: 1px 1px 1px #828282;
  border: 1px solid #8a8a8a;
  height: 9px;
  width: 35px;
  border-radius: 6px;
  background: #dadada;
  cursor: pointer;
}
.menu form input[type="range"]::-ms-track {
  width: 100%;
  height: 5px;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  color: transparent;
}
.menu form input[type="range"]::-ms-fill-lower {
  background: #b6b6b6;
  border: 1px solid #8a8a8a;
  border-radius: 50px;
  box-shadow: 0px 0px 0px #000000;
}
.menu form input[type="range"]::-ms-fill-upper {
  background: #b6b6b6;
  border: 1px solid #8a8a8a;
  border-radius: 50px;
  box-shadow: 0px 0px 0px #000000;
}
.menu form input[type="range"]::-ms-thumb {
  margin-top: 1px;
  box-shadow: 1px 1px 1px #828282;
  border: 1px solid #8a8a8a;
  height: 9px;
  width: 35px;
  border-radius: 6px;
  background: #dadada;
  cursor: pointer;
}
.btn-group {
  display: flex;
  justify-content: space-between;
}

.btn-group button {
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
}
.btn-group button.delete {
  background-color: rgba(255, 0, 0, 0.9);
  color: white;
}
.btn-group button.delete:hover {
  background-color: rgba(255, 0, 0, 0.7);
}

.btn-group button.delete:active {
  background-color: rgba(255, 0, 0, 0.5);
}

.btn-group button:nth-child(1) {
  margin-right: 10px;
}

.btn-group button:hover {
  background-color: rgba(255, 255, 255, 0.7);
}

.btn-group button:active {
  transform: scale(0.9);
  background-color: rgba(255, 255, 255, 0.9);
}
</style>
