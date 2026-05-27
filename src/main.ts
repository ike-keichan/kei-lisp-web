import { createApp } from 'vue';
import { installProcessShim } from './shims/process';
import App from './App.vue';

installProcessShim();

createApp(App).mount('#app');
