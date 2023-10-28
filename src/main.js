import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import App from './App.vue'
import router from './router'
import SearchBar from './components/SearchBar.vue'
import axios from 'axios' // Import Axios

const baseUrl = 'http://127.0.0.1:8000'; // Define your API base URL
const axiosInstance = axios.create({
    baseURL: baseUrl,
});
const app = createApp(App)
app.config.globalProperties.$axios = axiosInstance;

app.component('SearchBar', SearchBar);

app.use(router)
app.use(MotionPlugin)

app.mount('#app')
