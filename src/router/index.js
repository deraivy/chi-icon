import { createRouter, createWebHistory } from "vue-router";
import { useFavouriteStore } from "@/store/wishlistStore";
import { session } from "../utils/index";
import Home from "../views/Home.vue";
import Login from "../views/Auth/Login.vue";
import Products from "../views/Products.vue";
import Registerr from "../views/Auth/Registerr.vue";
import RequestResetP from "../views/Auth/RequestResetP.vue";
import PasswordReset from "../views/Auth/PasswordReset.vue";
import ProductsDetails from "@/views/ProductsDetails.vue";
import VerifyEmail from "../views/Auth/VerifyEmail.vue";
import search from "../views/search.vue";
import Cart from "../views/Cart.vue";
import Checkout from "@/views/Checkout.vue";
import NotFound from "@/views/NotFound.vue";
import NetworkError from "@/views/NetworkError.vue";
import Contact from "@/views/Contact.vue";
import Wishlist from "@/views/Wishlist.vue";

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
    path: "/contact",
    name: "contact",
    component: Contact,
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
    path: "/wishlist",
    name: "wishlist",
    component: Wishlist,
  },
  {
    path: "/products-details/:id",
    name: "products-details",
    component: ProductsDetails,
    props: true,
  },
  {
    path: "/cart",
    name: "cart",
    component: Cart,
  },
  {
    path: "/search",
    name: "search",
    component: search,
  },
  {
    path: "/checkout",
    name: "checkout",
    component: Checkout,
  },
  {
    path: "/:catchAll(.*)",
    name: "notfound",
    component: NotFound,
    props: { resource: "page" },
  },
  {
    path: "/404/:resource",
    name: "404Response",
    component: NotFound,
    props: true,
  },
  {
    path: "/networkError",
    name: "networkError",
    component: NetworkError,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      const element = document.querySelector(to.hash);
      if (element) {
        return { el: to.hash, behavior: "smooth" };
      } else {
        return false;
      }
    } else {
      return { top: 0, behavior: "smooth" };
    }
  },
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const sessionData = session.get("sessionData");
  const favouriteStore = useFavouriteStore();

  if (requiresAuth && !sessionData) {
    return next({ name: "login" });
  }

  if (
    sessionData &&
    favouriteStore.favourites.length === 0 &&
    !favouriteStore.onLoading
  ) {
    try {
      await favouriteStore.fetchFavourites(); // ✅ safe now inside async function
    } catch (error) {
      console.error("Failed to fetch favourites:", error);
      // Optional: handle error, show notification, or redirect
    }
  }

  next();
});

export default router;
