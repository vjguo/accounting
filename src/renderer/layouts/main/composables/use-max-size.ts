import { onBeforeUnmount, ref, readonly } from 'vue'
import { ipcRenderer } from '@/utils/electron'
import { WINDOW_MAXIMIZE, WINDOW_UNMAXIMIZE } from '@common/constants/events'

export function useMaxSize() {
  const isMaxSize = ref(false)

  const handleWindowMaximize = () => (isMaxSize.value = true)
  const handleWindowUnmaximize = () => (isMaxSize.value = false)

  ipcRenderer.on(WINDOW_MAXIMIZE, handleWindowMaximize)
  ipcRenderer.on(WINDOW_UNMAXIMIZE, handleWindowUnmaximize)

  onBeforeUnmount(() => {
    ipcRenderer.off(WINDOW_MAXIMIZE, handleWindowMaximize)
    ipcRenderer.off(WINDOW_UNMAXIMIZE, handleWindowUnmaximize)
  })

  return readonly(isMaxSize)
}
