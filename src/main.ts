import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router/auto'
import App from './App.vue'
import './styles/main.css'
import type { TAppContext } from './types/common'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
})
app.use(router)
// Install modules under `modules/`
Object.values(import.meta.glob<{ install: TAppContext }>('./modules/*.ts', { eager: true }))
  .forEach(el => el.install?.({ app, router }))

app.mount('#app')
