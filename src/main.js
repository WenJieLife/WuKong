import App from './App.vue'
import { createApp } from 'vue'
import router from './router'
import installElementPlus from './plugins/element.js'
import '@/styles/index.scss'
const app = createApp(App)
installElementPlus(app)
app.use(router).mount('#app')

// import { test_login } from "../test/e2e_test";
// test_login()
