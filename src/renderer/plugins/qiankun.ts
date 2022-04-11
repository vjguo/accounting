import { registerMicroApps, start } from 'qiankun'

registerMicroApps([
  {
    name: 'base',
    entry: process.env.NODE_ENV === 'development' ? '//localhost:8081' : '//./base/index.html',
    container: '#container',
    activeRule: '/base'
  }
])

start()
