<template>
  <div class="window-controller">
    <div>
      <font-awesome-icon :icon="['far', 'window-minimize']"></font-awesome-icon>
    </div>
    <div>
      <font-awesome-icon :icon="['far', 'window-restore']"></font-awesome-icon>
    </div>
    <div>
      <font-awesome-icon :icon="['far', 'window-maximize']"></font-awesome-icon>
    </div>
    <div>
      <font-awesome-icon :icon="['far', 'window-close']"></font-awesome-icon>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.window-controller {
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
