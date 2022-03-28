import { registerMicroApps, start } from 'qiankun'

registerMicroApps([
  {
    name: 'reactApp',
    entry: '//localhost:8081',
    container: '#container',
    activeRule: '/base'
  }
])

start()
