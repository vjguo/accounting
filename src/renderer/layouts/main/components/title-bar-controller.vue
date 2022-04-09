<template>
  <div class="title-bar-controller">
    <title-bar-controller-item @click="minisizeWindow">
      <font-awesome-icon :icon="['far', 'window-minimize']" size="sm"></font-awesome-icon>
    </title-bar-controller-item>
    <title-bar-controller-item v-show="isMaxSize" @click="restoreWindow">
      <font-awesome-icon :icon="['far', 'window-restore']" size="sm"></font-awesome-icon>
    </title-bar-controller-item>
    <title-bar-controller-item v-show="!isMaxSize" @click="maximizeWindow">
      <font-awesome-icon :icon="['far', 'window-maximize']" size="sm"></font-awesome-icon>
    </title-bar-controller-item>
    <title-bar-controller-item @click="closeWindow">
      <font-awesome-icon :icon="['far', 'window-close']" size="sm"></font-awesome-icon>
    </title-bar-controller-item>
  </div>
</template>

<script setup lang="ts">
import { ipcRenderer } from '@/utils/electron'
import {
  MINIMIZE_WINDOW,
  MAXIMIZE_WINDOW,
  CLOSE_WINDOW,
  RESTORE_WINDOW
} from '@common/constants/events'
import { useMaxSize } from '@/layouts/main/composables/use-max-size'
import TitleBarControllerItem from './title-bar-controller-item.vue'

// data
const isMaxSize = useMaxSize()

// methods
function minisizeWindow() {
  ipcRenderer.send(MINIMIZE_WINDOW)
}

function maximizeWindow() {
  ipcRenderer.send(MAXIMIZE_WINDOW)
}

function restoreWindow() {
  ipcRenderer.send(RESTORE_WINDOW)
}

function closeWindow() {
  ipcRenderer.send(CLOSE_WINDOW)
}
</script>

<style lang="scss" scoped>
.title-bar-controller {
  display: flex;
  height: 100%;
  margin: 0 10px;
  align-items: center;
  -webkit-app-region: none;
}
</style>
