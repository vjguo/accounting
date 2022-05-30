<template>
  <section class="main-layout">
    <header class="main-layout__header">
      <slot name="header"></slot>
    </header>
    <section class="main-layout__body">
      <aside class="main-layout__aside">
        <slot name="aside"></slot>
      </aside>
      <main class="main-layout__main">
        <slot name="main"></slot>
      </main>
    </section>
  </section>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.main-layout {
  --main-layout-header-height: 60px;
  --main-layout-aside-width: 200px;
  height: 100%;

  &__header {
    height: var(--main-layout-header-height);
    -webkit-app-region: drag;
  }

  &__body {
    display: flex;
    flex-direction: row;
    height: calc(100% - var(--main-layout-header-height));
  }

  &__aside {
    width: var(--main-layout-aside-width);
    flex-shrink: 0;
  }

  &__main {
    flex: 1;
    width: 0; // https://github.com/element-plus/element-plus/issues/6202
  }
}
</style>
