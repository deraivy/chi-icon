import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Auth/Login.vue";
import Products from "../views/Products.vue";
import Registerr from "../views/Auth/Registerr.vue";
import RequestResetP from "../views/Auth/RequestResetP.vue";
import PasswordReset from "../views/Auth/PasswordReset.vue";
import ProductsDetails from "@/views/ProductsDetails.vue";
import VerifyEmail from "../views/Auth/VerifyEmail.vue";
import search from "../views/search.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Registerr,
  },
  {
    path: "/request-reset",
    name: "request-reset",
    component: RequestResetP,
  },
  {
    path: "/verifyemail",
    name: "verifyemail",
    component: VerifyEmail,
  },
  {
    path: "/passwordreset",
    name: "passwordreset",
    component: PasswordReset,
  },
  {
    path: "/products",
    name: "products",
    component: Products,
  },
  {
    path: "/products-details/:id",
    name: "products-details",
    component: ProductsDetails,
    props: true,
  },
  {
    path: "/search",
    name: "search",
    component: search,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
