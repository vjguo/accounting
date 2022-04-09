<template>
  <main-frame>
    <template #header>
      <title-bar></title-bar>
    </template>
    <template #aside></template>
    <template #main>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component"></component>
        </keep-alive>
      </router-view>
    </template>
  </main-frame>
</template>

<script setup lang="ts">
import mainFrame from './components/main-frame.vue'
import TitleBar from './components/title-bar.vue'
</script>

<style lang="scss" scoped></style>
