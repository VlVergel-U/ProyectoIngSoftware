// import './assets/main.css'
import './assets/style.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/routes.js'
import store from '../../../store.js';
import 'material-icons/iconfont/material-icons.css';
import '@fortawesome/fontawesome-free/css/all.css'

createApp(App).use(router).use(store).mount('#app')
