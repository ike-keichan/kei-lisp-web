import { createApp } from 'vue';
import { installProcessShim } from './repl-bus';
import App from './App.vue';

installProcessShim();

createApp(App).mount('#app');
