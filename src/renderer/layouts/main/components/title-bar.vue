<template>
  <div class="title-bar">
    <div class="title-bar__left">
      <h1 style="margin: 0 10px">贝壳记账</h1>
    </div>
    <div class="title-bar__right">
      <title-bar-menu></title-bar-menu>
      <title-bar-controller></title-bar-controller>
    </div>
  </div>
</template>

<script setup lang="ts">
import TitleBarController from './title-bar-controller.vue'
import TitleBarMenu from './title-bar-menu.vue'
</script>

<style lang="scss" scoped>
.title-bar {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  color: var(--color-white);
  background: var(--color-primary);

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
