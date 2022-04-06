<template>
  <section class="default-layout">
    <header class="default-layout__header">
      <title-bar></title-bar>
    </header>
    <section class="default-layout__body">
      <aside class="default-layout__aside">
        <slot name="aside"></slot>
      </aside>
      <main class="default-layout__main">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component"></component>
          </keep-alive>
        </router-view>
      </main>
    </section>
  </section>
</template>

<script setup lang="ts">
import TitleBar from './components/title-bar/title-bar.vue'
</script>

<style lang="scss" scoped>
.default-layout {
  --default-layout-header-height: 60px;
  --default-layout-aside-width: 200px;
  height: 100%;

  &__header {
    height: var(--default-layout-header-height);
    -webkit-app-region: drag;
  }

  &__body {
    display: flex;
    flex-direction: row;
    height: calc(100% - var(--default-layout-header-height));
  }

  &__aside {
    width: var(--default-layout-aside-width);
    flex-shrink: 0;
  }

  &__main {
    flex: 1;
  }
}
</style>
