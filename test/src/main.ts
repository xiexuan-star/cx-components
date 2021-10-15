import App from './App.vue';
import router from './router';
import { useChxUI } from './plugins/chx-ui';
import {createApp} from 'vue'

const app = createApp(App);
useChxUI(app);
app.use(router).mount('#app');
