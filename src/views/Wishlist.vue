<template>
  <div class="min-h-screen bg-[#f5f5f5]">
    <!-- Main Content -->
    <div class="w-full md:container mx-auto px-4 py-12">
      <h1 class="text-2xl font-bold mb-6">My Wishlist</h1>

      <div
        v-if="favouriteStore.onLoading"
        class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <SkLoader v-for="i in 8" :key="i" />
      </div>
      <div
        v-else-if="favouriteStore.favourites.length === 0"
        class="text-center h-[60vh] flex flex-col items-center justify-center"
      >
        <svg
          class="w-16 h-16 text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
        <p class="text-2xl font-semibold text-gray-900 mb-3">
          Your Wishlist is Empty
        </p>
        <p class="text-gray-500 max-w-md mb-6">
          Add items you love to your wishlist for easy access later. Keep track
          of your favorites and never miss out!
        </p>
        <router-link to="/" class="inline-block">
          <button
            class="px-6 py-3 bg-[#10203f] hover:bg-[#1e3a8a] text-white font-medium rounded-lg transition-colors duration-300"
          >
            Continue Shopping
          </button>
        </router-link>
      </div>

      <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="product in favouriteStore.favourites"
          :key="product.id"
          class=""
        >
          <img
            :src="product.image || '/images/placeholder.png'"
            alt="Product image"
            class="h-64 md:h-72 lg:h-80 w-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
          />
          <div class="flex flex-col gap-2 mt-4">
            <div class="flex justify-between items-center">
              <h2
                class="text-base font-semibold text-gray-800 truncate capitalize tracking-tight hover:text-[#10203f] transition-colors duration-200"
              >
                {{ product.name }}
              </h2>
              <button
                @click="toggle(product)"
                class="text-red-500 hover:text-red-700 text-xl"
                title="Remove from Wishlist"
              >
                ♥
              </button>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-lg font-bold text-red-600">
                ₦{{ product.price.toLocaleString("en-NG") }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useFavouriteStore } from "@/store/wishlistStore";
import { session } from "@/utils";
import SkLoader from "@/components/skLoader.vue";

const favouriteStore = useFavouriteStore();

onMounted(() => {
  const sessionData = session.get("sessionData");
  if (sessionData) {
    favouriteStore.fetchFavourites();
  } else {
    favouriteStore.favourites = [];
  }
});

const toggle = (product) => favouriteStore.toggleFavourite(product);
</script>
