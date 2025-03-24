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
          <!-- Search Icon (Desktop) -->
          <button
            @click="isSearchModalOpen = true"
            class="transition-colors duration-200"
          >
            <svg
              class="w-6 h-6 text-gray-700 hover:text-red-600 transition-colors duration-200"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          <!-- Cart & Login (Desktop) -->
          <div class="hidden md:flex items-center space-x-4">
            <router-link to="/" class="relative group">
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
        <!-- Search Icon (Mobile) -->
        <button
          @click="
            isSearchModalOpen = true;
            toggleMenu();
          "
          class="flex items-center text-gray-700 hover:text-red-600 text-base font-medium transition-colors duration-200"
        >
          Search
        </button>

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

    <!-- Search Modal -->
    <div
      v-if="isSearchModalOpen"
      class="inset-0 bg-[#f2f2f2] bg-opacity-100 z-50 flex items-start justify-center pt-10"
    >
      <div
        class="w-full max-w-6xl p-6 transform transition-all duration-300 scale-100"
      >
        <!-- Modal Header -->
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-semibold text-gray-900">Search Products</h3>
          <button
            @click="isSearchModalOpen = false"
            class="text-gray-600 hover:text-gray-800"
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

        <!-- Search Input -->
        <div class="relative">
          <input
            v-model="searchQuery"
            @input="searchProducts"
            @keyup.enter="goToSearchPage"
            type="text"
            placeholder="Search for products..."
            class="w-full p-3 pl-10 border-b border-gray-200 focus:border-b-2 focus:border-blue-500 outline-none text-gray-700 placeholder-gray-400 transition-all duration-200 bg-transparent"
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

        <!-- Top Search Results Section -->
        <h2 class="mt-6 text-sm font-medium text-gray-900">
          Top Search Results:
        </h2>
        <div
          v-if="topResults?.length"
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4"
        >
          <div
            v-for="result in topResults"
            :key="result.id"
            class="rounded-lg transition-all duration-300 cursor-pointer"
            @click="goToProductPage(result.id)"
          >
            <img
              :src="result.image"
              alt=""
              class="h-64 w-full object-cover rounded-lg"
            />
            <div class="px-1 py-4">
              <p class="text-gray-800 text-sm">
                {{ result.name }}
              </p>
              <p class="text-red-600 text-lg font-semibold">
                ₦{{ result.price.toLocaleString() }}
              </p>
            </div>
          </div>
        </div>

        <!-- No Results Found -->
        <div
          v-else-if="searchQuery && !topResults?.length"
          class="mt-6 text-gray-500 text-center text-lg"
        >
          No results found.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "../store/cartStore";
import { useProductStore } from "../store/ProductStore";
import { storeToRefs } from "pinia";

export default {
  name: "NavBar",
  setup() {
    const router = useRouter();
    const cartStore = useCartStore();
    const productStore = useProductStore();
    const { cartCount } = storeToRefs(cartStore);
    const { products } = storeToRefs(productStore);

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
      topResults.value = filtered;
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

    // Fetch products on mount if not already loaded
    onMounted(() => {
      if (!products.value.length) {
        productStore.fetchProducts();
      }
    });

    return {
      isMenuOpen,
      toggleMenu,
      cartCount,
      isSearchModalOpen,
      searchQuery,
      topResults,
      searchProducts,
      goToSearchPage,
      goToProductPage,
    };
  },
};
</script>
