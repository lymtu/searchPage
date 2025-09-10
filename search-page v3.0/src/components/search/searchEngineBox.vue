<script setup>
import { InputStore, selectedEngineInfo } from "@/lib/store/inputStore";
</script>

<template>
    <div class="searchEngineBox">
        <div class="item" :title="selectedEngineInfo.name">
            <img :src="selectedEngineInfo.image" alt="">
        </div>
        <div class="more">
            <div>
                <template v-for="(value, key) of InputStore.searchEngineList" :key="key">
                    <div class="item" v-if="key !== InputStore.selectedEngine" :title="value.name"
                        @click="InputStore.setSelectedEngine(key)" onmousedown="return false">
                        <img :src="value.image" alt="">
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped>
.searchEngineBox .more {
    display: grid;
    row-gap: 10px;
    grid-template-rows: 0fr;
    transition: 100ms;
    overflow: hidden;
}

.searchEngineBox .more>* {
    min-height: 0px;
}

.searchEngineBox:hover .more {
    grid-template-rows: 1fr;
    padding-top: 10px;
    padding-bottom: 10px;
}

.searchEngineBox .item {
    width: var(--size);
    height: var(--size);
    border-radius: 0.5rem;
    margin: 0 auto;
    cursor: pointer;
    overflow: hidden;
}

.searchEngineBox>.item {
    margin-top: 0.25rem;
}

.searchEngineBox .item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>