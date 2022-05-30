import { defineCustomElement } from 'vue'
import AButton from './a-button.ce.vue'
import APageTitle from './a-page-title.ce.vue'

customElements.define('a-button', defineCustomElement(AButton))
customElements.define('a-page-title', defineCustomElement(APageTitle))
