<script setup>
import Background from '@/components/background.vue'
import InputBox from '@/components/search/index.vue'
import ShortcutContainer from '@/components/shortcutContainer/index.vue'
</script>

<template>
  <div class="main">
    <Background />

    <InputBox />

    <ShortcutContainer />
  </div>
</template>

<style scoped>
.main {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
}
</style>
