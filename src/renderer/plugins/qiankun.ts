import { registerMicroApps, start } from 'qiankun'

registerMicroApps([
  {
    name: 'base',
    entry: '//localhost:8081',
    container: '#container',
    activeRule: '/#/base'
  }
])

start()
