<template>
  <el-config-provider>
    <section class="frame">
      <header class="frame__header">
        <div class="title-bar">
          <div class="title-bar__left">
            <h1 class="title-bar__logo">OA</h1>
          </div>
          <div class="title-bar__right">
            <div class="title-bar__menu">123</div>
            <div class="title-bar__controller">
              <i class="fa-thin fa-xmark-large"></i>
            </div>
          </div>
        </div>
      </header>
      <section class="frame__body">
        <aside class="frame__aside">aside</aside>
        <main class="frame__main">
          <router-view></router-view>
        </main>
      </section>
    </section>
  </el-config-provider>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.frame {
  --frame-header-height: 60px;
  --frame-aside-width: 200px;
  height: 100%;

  &__header {
    height: var(--frame-header-height);
  }

  &__body {
    display: flex;
    flex-direction: row;
    height: calc(100% - var(--frame-header-height));
  }

  &__aside {
    width: var(--frame-aside-width);
    flex-shrink: 0;
  }

  &__main {
    flex: 1;
  }
}

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

  &__logo {
  }
  &__menu {
  }
  &__controller {
  }
}
</style>
