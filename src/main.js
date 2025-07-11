import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persistedstate";
import App from "./App.vue";
import router from "./router";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { Icon } from "@iconify/vue";
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";

const toastOptions = {
  position: "top-right",
  timeout: 5000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
};

const pinia = createPinia();
pinia.use(piniaPersist);

const app = createApp(App);
app.use(router);
app.use(pinia);
app.component("AppIcon", Icon);
app.use(Toast, toastOptions);
app.use(VueAwesomePaginate);
app.mount("#app");
