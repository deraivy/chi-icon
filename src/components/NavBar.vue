<template>
  <div class="bg-white sticky top-0 z-50 border-b border-gray-200 shadow-sm">
    <div class="w-full container mx-auto px-4">
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
              class="w-24 h-24 lg:w-32 lg:h-32 sm:w-16 sm:h-16 object-contain transition-transform duration-300 ease-in-out"
            />
          </router-link>

          <!-- Desktop Menu -->
          <div
            class="hidden md:flex items-center space-x-6 lg:space-x-8 text-base font-medium text-gray-700"
          >
            <router-link
              to="/"
              class="hover:text-[#EB5E28] transition-colors"
              @click="isSearchModalOpen = false"
            >
              Home
            </router-link>
            <router-link
              to="/products"
              class="hover:text-[#EB5E28] transition-colors"
              @click="isSearchModalOpen = false"
            >
              Shop
            </router-link>
            <router-link
              to="/contact"
              class="hover:text-[#EB5E28] transition-colors"
              @click="isSearchModalOpen = false"
            >
              Contact Us
            </router-link>
          </div>
        </div>

        <div class="flex items-center space-x-3">
          <!-- Search -->
          <button
            @click="isSearchModalOpen = true"
            class="text-gray-700 hover:text-red-500 transition-colors duration-200"
            aria-label="Search"
          >
            <AppIcon icon="ph:magnifying-glass-bold" class="w-7 h-7" />
          </button>

          <!-- Cart -->
          <router-link
            to="/cart"
            class="relative group"
            @click="isSearchModalOpen = false"
          >
            <AppIcon
              icon="akar-icons:shopping-bag"
              class="w-7 h-7 text-gray-800 group-hover:text-red-500 transition-colors duration-200"
            />
            <span
              class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
            >
              {{ cartCount }}
            </span>
          </router-link>

          <!-- Wishlist -->
          <router-link
            to="/wishlist"
            class="relative group"
            @click="isSearchModalOpen = false"
          >
            <AppIcon
              icon="icon-park-outline:like"
              class="w-7 h-7 text-gray-800 group-hover:text-red-500 transition-colors duration-200"
            />
            <span
              class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
            >
              {{ favouriteCount }}
            </span>
          </router-link>

          <!-- Account -->
          <div class="hidden md:block relative group">
            <div class="cursor-pointer">
              <AppIcon icon="bi:person" class="w-8 h-8 text-gray-700" />
            </div>

            <div
              class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50"
            >
              <ul class="py-2 text-gray-700">
                <li>
                  <router-link
                    v-if="!isLoggedIn"
                    to="/login"
                    class="block cursor-pointer px-4 py-2 hover:bg-gray-100"
                    >Login</router-link
                  >
                </li>
                <li>
                  <router-link
                    v-if="!isLoggedIn"
                    to="/register"
                    class="block cursor-pointer px-4 py-2 hover:bg-gray-100"
                    >Register</router-link
                  >
                </li>
                <li>
                  <router-link
                    v-if="isLoggedIn"
                    to="/order"
                    class="block cursor-pointer px-4 py-2 hover:bg-gray-100"
                  >
                    My Orders
                  </router-link>
                </li>
                <li>
                  <router-link
                    v-if="isLoggedIn"
                    to="/logout"
                    @click="logoutUser"
                    class="block cursor-pointer px-4 py-2 hover:bg-gray-100"
                    >Logout</router-link
                  >
                </li>
              </ul>
            </div>
          </div>

          <!-- Mobile Menu Toggle -->
          <button
            v-if="!drawer"
            @click="openDrawer"
            class="md:hidden text-gray-700 hover:text-red-500 transition-colors duration-200"
            aria-label="Open Menu"
          >
            <AppIcon
              icon="iconamoon:menu-burger-horizontal-fill"
              class="w-8 h-8"
            />
          </button>

          <button
            v-else
            @click="closeDrawer"
            class="md:hidden text-gray-700 hover:text-[#EB5E28] transition-colors duration-200"
            aria-label="Close Menu"
          >
            <AppIcon icon="iconamoon:close" class="w-8 h-8" />
          </button>
        </div>
      </nav>

      <!-- Mobile Dropdown Menu -->
      <div
        v-if="drawer"
        class="md:hidden bg-white text-center px-4 py-6 flex flex-col space-y-4"
      >
        <router-link
          to="/"
          class="text-gray-700 hover:text-[#EB5E28] text-base font-medium transition-colors duration-200"
          @click="handleMobileNavClick"
        >
          Home
        </router-link>
        <router-link
          to="/products"
          class="text-gray-700 hover:text-[#EB5E28] text-base font-medium transition-colors duration-200"
          @click="handleMobileNavClick"
        >
          Shop
        </router-link>
        <router-link
          to="/contact"
          class="text-gray-700 hover:text-[#EB5E28] text-base font-medium transition-colors duration-200"
          @click="handleMobileNavClick"
        >
          Contact Us
        </router-link>
        <router-link
          v-if="!isLoggedIn"
          to="/login"
          class="text-gray-700 hover:text-[#EB5E28] text-base font-medium transition-colors duration-200"
          @click="handleMobileNavClick"
        >
          Login
        </router-link>
        <router-link
          v-if="!isLoggedIn"
          to="/register"
          class="text-gray-700 hover:text-[#EB5E28] text-base font-medium transition-colors duration-200"
          @click="handleMobileNavClick"
        >
          Register
        </router-link>
        <router-link
          v-if="isLoggedIn"
          to="/order"
          class="text-gray-700 hover:text-[#EB5E28] text-base font-medium transition-colors duration-200"
          @click="handleMobileNavClick"
        >
          My Orders
        </router-link>
        <router-link
          v-if="isLoggedIn"
          to="/logout"
          @click="logoutUser"
          class="text-gray-700 hover:text-[#EB5E28] text-base font-medium transition-colors duration-200"
        >
          Logout
        </router-link>
      </div>
    </div>

    <!-- Search Modal -->
    <!-- Overlay -->
    <div
      v-if="isSearchModalOpen"
      class="fixed inset-0 bg-white/40 backdrop-blur-xs z-40 transition-opacity duration-300"
      @click="isSearchModalOpen = false"
    />
    <div
      v-if="isSearchModalOpen"
      class="fixed top-0 left-0 w-full h-full sm:h-auto sm:max-h-[90vh] bg-white z-50 overflow-y-auto px-4 sm:px-8 md:px-16 lg:px-24 py-8 sm:py-12 shadow-2xl sm:rounded-b-2xl"
    >
      <div class="flex justify-end items-center mb-4">
        <button
          @click="isSearchModalOpen = false"
          class="text-gray-500 hover:text-gray-900 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
          aria-label="Close Search"
        >
          <svg
            class="w-7 h-7"
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

      <div class="relative py-4 max-w-3xl mx-auto">
        <input
          v-model="searchQuery"
          @input="searchProducts"
          @keyup.enter="goToSearchPage"
          placeholder="I'm looking for..."
          class="w-full p-4 pr-12 border-0 border-b-2 border-gray-300 focus:border-[#10203f] bg-gray-50 rounded-t-lg text-gray-800 placeholder-gray-400 focus:ring-0 focus:outline-none transition-all duration-300 text-lg sm:text-xl font-light"
          autofocus
        />
        <svg
          class="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400"
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

      <div
        v-if="topResults?.length"
        class="w-full md:container px-4 mx-auto mt-6"
      >
        <div
          class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          <ProductCard
            v-for="product in topResults"
            :key="product.id"
            :product="product"
            @click="goToProductPage(product.id)"
            class="transition-transform duration-200 hover:scale-105"
          />
        </div>
      </div>

      <div
        v-else-if="searchQuery && !topResults?.length"
        class="mt-10 text-gray-500 text-center text-lg sm:text-xl font-light"
      >
        No results found. Try a different search term.
      </div>
    </div>
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

const drawer = ref(false);
const isSearchModalOpen = ref(false);
const searchQuery = ref("");
const topResults = ref([]);

const openDrawer = () => {
  drawer.value = true;
};
const closeDrawer = () => {
  drawer.value = false;
};
const toggleMenu = () => {
  drawer.value = !drawer.value;
};
const handleMobileNavClick = () => {
  toggleMenu();
  isSearchModalOpen.value = false;
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
