<template>
  <div class="title-bar">
    <div class="title-bar__left">
      <h1 class="title-bar__logo">Accouting</h1>
    </div>
    <div class="title-bar__right">
      <title-menu></title-menu>
      <window-controller></window-controller>
    </div>
  </div>
</template>

<script setup lang="ts">
import WindowController from './components/window-controller.vue'
import TitleMenu from './components/title-menu.vue'
</script>

<style lang="scss" scoped>
.title-bar {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;

  &__left {
    display: flex;
    height: 100%;
    align-items: center;
  }

  &__right {
    display: flex;
    height: 100%;
    justify-content: right;
    align-items: center;
  }
}
</style>
