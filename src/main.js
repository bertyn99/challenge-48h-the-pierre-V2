import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import "./assets/css/index.css";
import GStore from "./store/store";
import { createPinia } from 'pinia'
import { PiniaColada } from '@pinia/colada'

createApp(App)
    .provide("state", GStore)
    .use(router)
    .use(createPinia())
    // install after pinia
    .use(PiniaColada, {
    // optional options
    })
    .mount("#app");
