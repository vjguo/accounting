import { ipcMain, BrowserWindow } from 'electron'
import {
  RESTORE_WINDOW,
  MINIMIZE_WINDOW,
  MAXIMIZE_WINDOW,
  CLOSE_WINDOW
} from '@common/constants/events'

ipcMain.on(RESTORE_WINDOW, event => {
  BrowserWindow.fromWebContents(event.sender)?.restore()
})

ipcMain.on(MINIMIZE_WINDOW, event => {
  BrowserWindow.fromWebContents(event.sender)?.minimize()
})

ipcMain.on(MAXIMIZE_WINDOW, event => {
  BrowserWindow.fromWebContents(event.sender)?.maximize()
})

ipcMain.on(CLOSE_WINDOW, event => {
  BrowserWindow.fromWebContents(event.sender)?.close()
})
