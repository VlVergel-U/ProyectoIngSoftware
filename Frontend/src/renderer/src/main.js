// import './assets/main.css'
import './assets/style.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/routes.js'
import store from '../../../store.js';

createApp(App).use(router).use(store).mount('#app')
