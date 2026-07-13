import { createApp } from 'vue'
import { createPinia } from 'pinia'
import persistedState from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue';

import addCustomDirectives, {
    hideInLogin
  } from './utils/directives'

import './assets/css/main.css'

try {
    const app = createApp(App)
    const pinia = createPinia()
    const addDirectives = addCustomDirectives(app)

    pinia.use(persistedState)
    app.use(pinia)
    app.use(router)
    app.use(Antd)

    // Add custom directives
    addDirectives('hide-inlogin', hideInLogin)

    app.mount('#app')
} catch (err) {
  console.error(err)
}