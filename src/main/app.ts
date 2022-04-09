import { app } from 'electron'
import { registerProtocol } from '@main/utils/protocol'
import { createMainWindow } from './windows/main-window'
import '@main/events'

app.on('ready', () => {
  registerProtocol()
  createMainWindow()
})
