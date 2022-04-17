<template>
  <div class="title-bar-navigator">
    <el-button
      :disabled="isFirstHistoryRecord"
      size="small"
      circle
      :icon="ArrowLeft"
      @click="back"
    ></el-button>
    <el-button
      :disabled="isLastHistoryRecord"
      size="small"
      circle
      :icon="ArrowRight"
      @click="forward"
    ></el-button>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import { onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'

const { back, forward } = useRouter()

const isFirstHistoryRecord = ref(!!history.state.back)
const isLastHistoryRecord = ref(!!history.state.forward)

const popStateHandler = ({ state: { back, forward } }: PopStateEvent) => {
  isFirstHistoryRecord.value = back == null
  isLastHistoryRecord.value = forward == null
}

window.addEventListener('popstate', popStateHandler)
onBeforeUnmount(() => {
  window.removeEventListener('popstate', popStateHandler)
})
</script>

<style lang="scss" scoped>
.title-bar-navigator {
  display: flex;
  height: 100%;
  align-items: center;
  padding: 0 10px;
  -webkit-app-region: none;
}
</style>
