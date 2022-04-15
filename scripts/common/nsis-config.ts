import path from 'path'
import type { NsisOptions } from 'electron-builder'
const config: NsisOptions =
  process.platform === 'darwin'
    ? {}
    : {
        perMachine: true,
        allowElevation: true,
        allowToChangeInstallationDirectory: false,
        include: path.join(process.cwd(), 'scripts/common/installer.nsh'),
        createDesktopShortcut: true,
        createStartMenuShortcut: true,
        shortcutName: 'accounting',
        installerIcon: '../resource/unrelease/icon.ico',
        uninstallerIcon: '../resource/unrelease/icon.ico',
        installerHeader: '../resource/unrelease/icon.ico',
        installerHeaderIcon: '../resource/unrelease/icon.ico'
      }

export default config
