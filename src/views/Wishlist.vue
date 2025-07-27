<template>
  <div class="min-h-screen bg-[#f5f5f5]">
    <!-- Hero Section -->
    <section class="relative w-full h-[30vh] md:h-[40vh] lg:h-[50vh]">
      <img
        src="/images/header.jpg"
        alt="Hero background"
        class="w-full h-full object-cover"
      />
      <div class="absolute top-0 left-0 w-full h-full bg-black/40"></div>
      <div
        class="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold z-10"
      >
        Wishlist
      </div>
    </section>

    <!-- Main Content -->
    <div class="w-full md:container mx-auto px-4 py-12">
      <h1 class="text-2xl font-bold mb-6">Your Favourites</h1>

      <div
        v-if="favouriteStore.onLoading"
        class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <SkLoader v-for="i in 8" :key="i" />
      </div>
      <div
        v-else-if="favouriteStore.favourites.length === 0"
        class="text-center"
      >
        <p class="text-lg text-gray-600 mb-2">Your wishlist is empty</p>
        <router-link
          to="/"
          class="text-red-600 font-medium underline hover:text-red-800"
        >
          Continue Shopping
        </router-link>
      </div>

      <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="product in favouriteStore.favourites"
          :key="product.id"
          class="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition"
        >
          <img
            :src="product.image || '/images/placeholder.png'"
            alt="Product image"
            class="w-full h-60 object-cover"
          />
          <div class="p-4 flex flex-col gap-2">
            <div class="flex justify-between items-center">
              <h2 class="font-semibold text-2xl truncate">
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
            <p class="text-gray-800 font-bold text-lg">₦{{ product.price }}</p>
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
