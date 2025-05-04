//import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'
import axios from 'axios'
import App from './App.vue'
import PrimeVue from 'primevue/config';

import router from './router'
import './output.css'


axios.defaults.baseURL = 'http://localhost:8080/api';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;


const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPersist)
app.use(PrimeVue)
app.use(pinia)
app.use(router)
app.use(axios)

app.mount('#app')
