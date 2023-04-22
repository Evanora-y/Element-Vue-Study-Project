import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import  './assets/css/global.css'
import axios from "axios";

// 基准地址
axios.defaults.baseURL = 'http://106.13.226.61:8888/api/private/v1/'


// 响应头预处理
axios.interceptors.request.use(config =>{

    // console.log(config);
    config.headers.Authorization =window.sessionStorage.getItem("token")
    return config
})



const app = createApp(App)

app.use(ElementPlus)
app.use(router)

app.mount('#app')


// 确保在使用变量之前对其进行初始化。
// 在访问变量之前，将其声明在代码块之外。
// 检查变量名是否在其他作用域中使用，以避免混淆。
app.config.globalProperties.$axios = axios
app.config.globalProperties.$router = router