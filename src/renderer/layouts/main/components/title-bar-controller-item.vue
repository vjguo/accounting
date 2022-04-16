<template>
  <div class="title-bar-controller-item">
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.title-bar-controller-item {
  display: flex;
  height: 40px;
  width: 40px;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: var(--color-primary-light);
  }
}
</style>
