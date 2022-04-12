<template>
  <button></button>
</template>

<script setup lang="ts">
interface AButtonProps {
  type?: string
}
withDefaults(defineProps<AButtonProps>(), { type: 'default' })
</script>

<style lang="scss"></style>
