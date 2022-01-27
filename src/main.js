import { createApp } from 'vue';
import App from './App';
import { store } from './store';
import './assets/index.scss';

const app = createApp(App);
app.use(store);
app.mount('#app');
