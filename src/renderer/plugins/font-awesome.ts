import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faWindowClose,
  faWindowMinimize,
  faWindowMaximize,
  faWindowRestore
} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type { App } from 'vue'

library.add(faWindowClose, faWindowMinimize, faWindowMaximize, faWindowRestore)

export default {
  install(app: App) {
    app.component('FontAwesomeIcon', FontAwesomeIcon)
  }
}
