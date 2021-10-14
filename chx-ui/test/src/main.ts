import { createApp } from '../../node_modules/vue'
import App from './App.vue'
import router from './router'
import {useChxUI} from './plugins/chx-ui'

const app =  createApp(App)
useChxUI(app)
app.use(router).mount('#app')
