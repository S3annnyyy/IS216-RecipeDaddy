import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import App from './App.vue'
import router from './router'
import SearchBar from './components/SearchBar.vue'

const app = createApp(App)

app.component('SearchBar', SearchBar);

app.use(router)
app.use(MotionPlugin)

app.mount('#app')
