import type { WindowsConfiguration } from 'electron-builder'
const config: WindowsConfiguration =
  process.platform === 'darwin'
    ? {}
    : {
        icon: '../resource/unrelease/icon.ico',
        target: [
          {
            target: 'nsis',
            arch: ['ia32']
          }
        ],
        sign: async () => ({})
      }

export default config
