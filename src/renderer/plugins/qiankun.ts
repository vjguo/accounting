import { registerMicroApps, start } from 'qiankun'
import database from '@/database'

registerMicroApps([
  {
    name: 'base',
    entry: process.env.NODE_ENV === 'development' ? '//localhost:8081' : '//./base/index.html',
    container: '#container',
    activeRule: '/base',
    props: {
      database
    }
  }
])

start()
