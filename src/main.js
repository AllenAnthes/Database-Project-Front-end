import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import axios from 'axios'
import locale from 'element-ui/lib/locale/lang/en'
import DataTables from 'vue-data-tables'

Object.defineProperty(Vue.prototype, '$axios', { value: axios });

Vue.use(ElementUI, { locale })
Vue.use(DataTables)

export const API_URL =  'http://127.0.0.1:8080/api/';


new Vue({

    el: '#app',
    router,
    components: { App },
  render: h => h(App)
})

