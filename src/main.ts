import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router/auto'
import App from './App.vue'
import { vuetify } from './modules/vuetify'
import './styles/main.css'
import { store } from './modules/pinia'
import { notifications } from './modules/notifications'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
})
app.use(router)
app.use(vuetify)
app.use(store)
app.use(notifications)
app.mount('#app')
