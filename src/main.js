import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
// import search_input from '../packages/search_input'


const app = createApp(App)
app.use(router)
app.use(ElementPlus)

// app.component('search_input', search_input);

app.mount('#app')
