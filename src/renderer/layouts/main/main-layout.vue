<template>
  <main-frame>
    <template #header>
      <title-bar></title-bar>
    </template>
    <template #aside>
      <side-bar></side-bar>
    </template>
    <template #main>
      <div id="container"></div>
      <!-- <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component"></component>
        </keep-alive>
      </router-view> -->
    </template>
  </main-frame>
</template>

<script setup lang="ts">
import MainFrame from './components/main-frame.vue'
import TitleBar from './components/title-bar.vue'
import SideBar from './components/side-bar.vue'
</script>

<style lang="scss" scoped></style>
