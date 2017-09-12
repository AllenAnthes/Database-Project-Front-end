import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import axios from 'axios'
import locale from 'element-ui/lib/locale/lang/en'

Object.defineProperty(Vue.prototype, '$axios', { value: axios });

Vue.use(ElementUI, { locale })


export const API_URL =  'http://127.0.0.1:8080/api/';

new Vue({
  el: '#app',
  render: h => h(App)
})
