<script setup>
defineEmits(["submit"]);

defineOptions({
  name: "classifyManageBox",
});
</script>

<template>
  <div class="classify-manage-box">
    <form action="" @submit.prevent="$emit('submit', $event)">
      <input type="text" name="label" required placeholder="分类名称" />
      <input type="text" name="value" required placeholder="分类id" />
      <button type="submit">添加分类</button>
    </form>
  </div>
</template>

<style scoped>
.classify-manage-box {
  width: 200px;
  height: fit-content;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.classify-manage-box form {
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.classify-manage-box form input {
  width: 100%;
  padding: 5px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.classify-manage-box form button {
  padding: 5px;
  border-radius: 5px;
  border: none;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  align-self: flex-end;
}

.classify-manage-box form button:hover {
  background-color: rgba(255, 255, 255, 0.7);
}
</style>
