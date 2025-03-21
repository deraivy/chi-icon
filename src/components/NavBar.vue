<template>
  <div class="bg-white shadow-md font-sans sticky top-0 z-50">
    <div class="mx-auto w-full max-w-8xl px-4 sm:px-6 lg:px-8">
      <nav class="flex justify-between items-center py-4 h-18">
        <!-- Logo -->
        <router-link to="/">
          <img
            src="/images/icon.png"
            alt="Hiicon Logo"
            class="w-40 h-40 object-contain transition-transform duration-300 hover:scale-105"
          />
        </router-link>

        <!-- Desktop Menu (Left Side) -->
        <div
          class="hidden md:flex items-center space-x-8 text-base font-medium"
        >
          <router-link
            to="/"
            class="text-gray-700 hover:text-red-600 transition-colors duration-200"
          >
            Home
          </router-link>
          <router-link
            to="/products"
            class="text-gray-700 hover:text-red-600 transition-colors duration-200"
          >
            Products
          </router-link>
        </div>

        <!-- Search, Cart & Login (Right Side) -->
        <div class="flex items-center space-x-4">
          <!-- Search Bar (Desktop) -->
          <div class="hidden md:flex">
            <div class="relative w-64">
              <input
                type="text"
                v-model="searchQuery"
                placeholder="Search products..."
                class="w-full py-2 px-4 pl-10 border border-gray-200 rounded-full focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-50 text-gray-700 placeholder-gray-400 transition-all duration-200"
                @input="handleSearch"
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
          </div>

          <!-- Cart & Login (Desktop) -->
          <div class="hidden md:flex items-center space-x-4">
            <router-link to="/cart" class="relative group">
              <img
                src="/icons/cart.svg"
                alt="Shopping Cart"
                class="w-7 h-7 text-gray-700 group-hover:text-red-600 transition-colors duration-200"
              />
              <span
                class="absolute -bottom-1 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
              >
                {{ cartCount }}
              </span>
            </router-link>
            <router-link
              to="/register"
              class="hover:text-red-600 transition-colors duration-200 font-medium"
            >
              <img
                src="/icons/user.svg"
                alt="account"
                class="w-7 h-7 group-hover:text-red-600 transition-colors duration-200"
              />
            </router-link>
          </div>

          <!-- Mobile Menu Button -->
          <button
            @click="toggleMenu"
            class="md:hidden focus:outline-none p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
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
      <div
        v-if="isMenuOpen"
        class="md:hidden bg-white border-t border-gray-100 shadow-lg px-4 py-4 flex flex-col space-y-3"
      >
        <!-- Search Bar (Mobile) -->
        <div class="relative mb-4">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search products..."
            class="w-full py-2 px-4 pl-10 border border-gray-200 rounded-full focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-50 text-gray-700 placeholder-gray-400 transition-all duration-200"
            @input="handleSearch"
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

        <!-- Menu Items -->
        <router-link
          to="/"
          class="text-gray-700 hover:text-red-600 text-base font-medium transition-colors duration-200"
          @click="toggleMenu"
        >
          Home
        </router-link>
        <router-link
          to="/products"
          class="text-gray-700 hover:text-red-600 text-base font-medium transition-colors duration-200"
          @click="toggleMenu"
        >
          Products
        </router-link>
        <router-link
          to="/cart"
          class="text-gray-700 hover:text-red-600 text-base font-medium transition-colors duration-200"
          @click="toggleMenu"
        >
          Cart ({{ cartCount }})
        </router-link>
        <router-link
          to="/register"
          class="text-gray-700 hover:text-red-600 text-base font-medium transition-colors duration-200"
          @click="toggleMenu"
        >
          Login
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useCartStore } from "../store/cartStore"; // Ensure correct path (case-sensitive)
import { storeToRefs } from "pinia"; // Import storeToRefs

export default {
  name: "NavBar",
  setup() {
    const isMenuOpen = ref(false);
    const cartStore = useCartStore();
    const { cartCount } = storeToRefs(cartStore); // Use storeToRefs for reactive getter

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    // Debug: Log cartCount to verify reactivity
    console.log("Initial cartCount:", cartStore.cartCount);
    return { isMenuOpen, toggleMenu, cartCount };
  },
};
</script>

<style scoped>
nav a {
  text-decoration: none;
  color: black;
}
nav a:hover {
  color: blue;
}
</style>
