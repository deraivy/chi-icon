<template>
  <header class="w-full bg-[#10203f] text-white">
    <div class="w-full md:container mx-auto px-5 py-2 overflow-hidden">
      <p class="text-center text-sm mt-2 marquee">
        Your one-stop shop for all things chic!
      </p>
    </div>
  </header>
  <div class="bg-white shadow-md font-sans sticky top-0 z-50">
    <div class="w-full md:container mx-auto px-2">
      <nav class="flex justify-between items-center py-4 h-18">
        <div class="flex items-center space-x-6">
          <router-link
            to="/"
            class="flex-shrink-0"
            @click="isSearchModalOpen = false"
          >
            <img
              src="/images/logo.png"
              alt="Hiicon Logo"
              class="w-24 h-24 lg:w-40 lg:h-48 sm:w-16 sm:h-16 md:w-32 md:h-32 object-contain transition-transform duration-300 ease-in-out"
            />
          </router-link>

          <!-- Desktop Menu (Left Side) -->
          <div
            class="hidden md:flex items-center space-x-6 lg:space-x-8 text-base font-semibold text-gray-700"
          >
            <router-link
              to="/"
              class="text-gray-700 hover:text-red-600 transition-colors duration-200"
              @click="isSearchModalOpen = false"
            >
              Home
            </router-link>
            <router-link
              to="/products"
              class="text-gray-700 hover:text-red-600 transition-colors duration-200"
              @click="isSearchModalOpen = false"
            >
              Shop
            </router-link>
            <router-link
              to="/contact"
              class="text-gray-700 hover:text-red-600 transition-colors duration-200"
              @click="isSearchModalOpen = false"
            >
              Contact Us
            </router-link>
          </div>
        </div>

        <div class="flex items-center">
          <!-- Search Icon -->
          <button
            @click="isSearchModalOpen = true"
            class="text-gray-700 hover:text-red-600 transition-colors duration-200"
          >
            <AppIcon icon="ph:magnifying-glass-bold" class="w-7 h-7" />
          </button>
          <!-- Login -->
          <div class="relative inline-block text-left">
            <div class="group">
              <button
                type="button"
                class="inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-gray-900 hover:text-red-700 focus:outline-none focus:bg-gray-700"
              >
                <AppIcon icon="gravity-ui:person" class="w-7 h-7" />
              </button>
              <div
                class="absolute left-0 w-40 mt-1 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:flex transition duration-300 flex-col"
              >
                <div class="py-1">
                  <button
                    v-show="isLoggedIn"
                    v-if="isLoggedIn"
                    @click="logoutUser"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                  <router-link
                    v-show="!isLoggedIn"
                    v-if="!isLoggedIn"
                    to="/login"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    @click="isSearchModalOpen = false"
                  >
                    Login
                  </router-link>
                  <router-link
                    v-show="!isLoggedIn"
                    v-if="!isLoggedIn"
                    to="/register"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    @click="isSearchModalOpen = false"
                  >
                    Register
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <!-- Cart -->
          <div class="flex items-center">
            <router-link
              to="/cart"
              class="relative group mr-3"
              @click="isSearchModalOpen = false"
            >
              <span
                class="w-7 h-7 text-gray-800 group-hover:text-red-600 transition-colors duration-200"
              >
                <AppIcon icon="akar-icons:shopping-bag" class="w-7 h-7" />
              </span>
              <span
                class="absolute -top-0 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
              >
                {{ cartCount }}
              </span>
            </router-link>
            <router-link
              to="/wishlist"
              class="relative group"
              @click="isSearchModalOpen = false"
            >
              <span
                class="w-7 h-7 text-gray-800 group-hover:text-red-600 transition-colors duration-200"
              >
                <AppIcon icon="icon-park-outline:like" class="w-7 h-7" />
              </span>
              <span
                class="absolute -top-0 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
              >
                {{ favouriteCount }}
              </span>
            </router-link>
          </div>

          <!-- Mobile Menu Button -->
          <button
            @click="toggleMenu"
            class="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors duration-200 focus:outline-none"
          >
            <svg
              class="h-6 w-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </nav>

      <!-- Mobile Dropdown Menu -->
      <transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <div
          v-if="isMenuOpen"
          class="md:hidden bg-white border-t border-gray-100 shadow-lg px-4 py-4 flex flex-col space-y-4"
        >
          <router-link
            to="/"
            class="text-gray-700 hover:text-red-600 text-base font-medium transition-colors duration-200"
            @click="
              toggleMenu;
              isSearchModalOpen = false;
            "
          >
            Home
          </router-link>
          <router-link
            to="/products"
            class="text-gray-700 hover:text-red-600 text-base font-medium transition-colors duration-200"
            @click="
              toggleMenu;
              isSearchModalOpen = false;
            "
          >
            Shop
          </router-link>
          <router-link
            to="/contact"
            class="text-gray-700 hover:text-red-600 text-base font-medium transition-colors duration-200"
            @click="
              toggleMenu;
              isSearchModalOpen = false;
            "
          >
            Contact Us
          </router-link>
          <router-link
            to="/register"
            class="text-gray-700 hover:text-red-600 text-base font-medium transition-colors duration-200"
            @click="
              toggleMenu;
              isSearchModalOpen = false;
            "
          >
            Register
          </router-link>
        </div>
      </transition>
    </div>

    <!-- Search Modal -->
    <transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isSearchModalOpen"
        class="w-full min-h-screen mx-auto md:container bg-white rounded-lg p-6 transform transition-all duration-300"
      >
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-semibold text-gray-900">Search Products</h3>
          <button
            @click="isSearchModalOpen = false"
            class="text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <svg
              class="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div class="relative">
          <input
            v-model="searchQuery"
            @input="searchProducts"
            @keyup.enter="goToSearchPage"
            type="text"
            placeholder="Search for products..."
            class="w-full p-3 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#10203f] focus:border-transparent outline-none text-gray-700 placeholder-gray-400 transition-all duration-200"
            autofocus
          />
          <svg
            class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <h2 class="mt-6 text-2xl font-medium text-gray-900">
          Top Search Results:
        </h2>
        <div v-if="topResults?.length" class="overflow-y-auto">
          <div
            class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4"
          >
            <ProductCard
              v-for="product in topResults"
              :key="product.id"
              :product="product"
              @click="goToProductPage(product.id)"
            />
          </div>
        </div>

        <div
          v-else-if="searchQuery && !topResults?.length"
          class="mt-6 text-gray-500 text-center text-lg"
        >
          No results found.
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/store/cartStore";
import { useFavouriteStore } from "@/store/wishlistStore";
import { useProductStore } from "@/store/ProductStore";
import { storeToRefs } from "pinia";
import { session } from "@/utils";
import ProductCard from "./ProductCard.vue";

const router = useRouter();
const cartStore = useCartStore();
const favouriteStore = useFavouriteStore();
const productStore = useProductStore();
const { cartCount } = storeToRefs(cartStore);
const { favouriteCount } = storeToRefs(favouriteStore);
const { products } = storeToRefs(productStore);

const isLoggedIn = computed(() => session.exists("sessionData"));
const isMenuOpen = ref(false);
const isSearchModalOpen = ref(false);
const searchQuery = ref("");
const topResults = ref([]);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const searchProducts = () => {
  if (!searchQuery.value.trim()) {
    topResults.value = [];
    return;
  }
  const filtered = products.value.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
  topResults.value = filtered.slice(0, 20);
};

const goToSearchPage = () => {
  if (searchQuery.value.trim()) {
    const searchUrl = `/search?q=${encodeURIComponent(searchQuery.value)}`;
    isSearchModalOpen.value = false;
    router
      .push(searchUrl)
      .then(() => {
        searchQuery.value = "";
        topResults.value = [];
      })
      .catch((err) => console.error("Navigation error:", err));
  }
};

const goToProductPage = (productId) => {
  isSearchModalOpen.value = false;
  router.push(`/products-details/${productId}`);
  searchQuery.value = "";
  topResults.value = [];
};

const logoutUser = () => {
  sessionStorage.clear();
  router.push("/login").then(() => {
    location.reload();
  });
};

onMounted(() => {
  cartStore.fetchCart();
  if (!products.value.length) {
    productStore.fetchProducts();
  }
});
</script>

<style scoped>
@keyframes scroll-left {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}
.marquee {
  display: inline-block;
  white-space: nowrap;
  animation: scroll-left 10s linear infinite;
}
</style>
