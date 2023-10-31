
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/css/base.css'

import App from './App.vue'
import router from './router'
import axios from 'axios'





// 全局请求基准地址
axios.defaults.baseURL = 'https://vuedemo.computer-storage.top/api/private/v1/'


//响应头预处理
axios.interceptors.request.use(config => {

    config.headers.Authorization = window.sessionStorage.getItem("token")
    return config;
})




const app = createApp(App)




app.use(ElementPlus)
app.use(createPinia())
app.use(router)

app.mount('#app')
