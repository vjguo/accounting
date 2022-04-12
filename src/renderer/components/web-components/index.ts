import { defineCustomElement } from 'vue'
import AButton from './a-button.ce.vue'

customElements.define('a-button', defineCustomElement(AButton))
