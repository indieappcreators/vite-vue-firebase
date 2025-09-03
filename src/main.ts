import './style.css'
import { createApp, h } from 'vue'
import { router } from './router'
import { RouterView } from "vue-router";

const app = createApp({ render: () => h(RouterView) });
app.use(router)
app.mount('#app')
