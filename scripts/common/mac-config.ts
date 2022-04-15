import type { MacConfiguration } from 'electron-builder'

const config: MacConfiguration =
  process.platform != 'darwin'
    ? {}
    : {
        icon: 'resource/unrelease/icon.icns',
        type: 'distribution'
        // TODO: identity: ''
      }

export default config
