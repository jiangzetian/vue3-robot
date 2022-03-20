import { createApp } from 'vue'
import router from '@/router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.mount('#app')
