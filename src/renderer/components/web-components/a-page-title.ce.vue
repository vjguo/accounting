<template>
  <h2 class="a-page-title">
    <slot></slot>
  </h2>
</template>

<script setup lang="ts">
defineProps({})
</script>

<style lang="scss">
.a-page-title {
  margin: 0;
  padding: 10px;
  color: var(--text-color-primary);
  font-size: 18px;
}
</style>
