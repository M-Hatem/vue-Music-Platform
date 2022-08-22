import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import VeeValidationPlugin from "./includes/validation";
import { auth } from "./includes/firebase";

import "./assets/base.css";
import "./assets/main.css";

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);

    app.use(createPinia());
    app.use(router);
    app.use(VeeValidationPlugin);

    app.mount("#app");
  }
});
