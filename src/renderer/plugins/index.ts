import './qiankun'
import FontAwesome from './font-awesome'
import { App } from 'vue'

export default {
  install(app: App) {
    app.use(FontAwesome)
  }
}
