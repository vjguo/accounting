import { WINDOW_MAXIMIZE, WINDOW_UNMAXIMIZE } from '@common/constants/events'
import { app, BrowserWindow } from 'electron'

export function createMainWindow() {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    minWidth: 1024,
    minHeight: 768,
    frame: false,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  if (app.isPackaged) {
    mainWindow.loadURL(`app://./index.html/`)
  } else {
    mainWindow.loadURL(`http://localhost:${process.env.WEB_PORT}`)
  }

  mainWindow.on('maximize', () => {
    mainWindow.webContents.send(WINDOW_MAXIMIZE)
  })

  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send(WINDOW_UNMAXIMIZE)
  })

  return mainWindow
}
