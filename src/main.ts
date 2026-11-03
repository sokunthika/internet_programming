import { createApp } from "vue";
<<<<<<< HEAD
import { createPinia } from "pinia";
import App from "./App.vue";
import { makeRouter } from "./router";
import "./style.css";

createApp(App).use(createPinia()).use(makeRouter()).mount("#app");
=======
import App from "./App.vue";
import "./style.css";

createApp(App).mount("#app");
>>>>>>> origin/main
