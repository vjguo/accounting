<template>
  <el-menu ref="ElMenu" default-active="/base" router class="side-bar-menu">
    <el-menu-item index="/base">基础项目</el-menu-item>
  </el-menu>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.side-bar-menu {
  height: 100%;
}
</style>
