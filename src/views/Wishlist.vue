<template>
  <div>
    <section class="relative w-full h-[25vh] md:h-[35vh] lg:h-[45vh]">
      <!-- Background Image -->
      <img
        src="/images/header.jpg"
        alt="Hero background"
        class="w-full h-full object-cover"
      />
      <div class="absolute top-0 left-0 w-full h-full bg-black/30"></div>
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold z-10"
      >
        Wishlist
      </div>
    </section>
    <div class="w-full md:container mx-auto px-4 py-12">
      <h1 class="text-2xl font-bold mb-4">Your Favourites</h1>

      <div v-if="favouriteStore.loading">Loading favourites...</div>

      <div v-else-if="favouriteStore.favourites.length === 0">
        <p>No favourites yet.</p>
      </div>

      <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="product in favouriteStore.favourites"
          :key="product.id"
          class="border rounded-lg p-4 shadow hover:shadow-lg transition"
        >
          <img :src="product.image" alt="" />
          <h2 class="font-semibold text-lg">{{ product.name }}</h2>
          <p class="text-sm text-gray-500">{{ product.description }}</p>

          <button
            @click="toggle(product)"
            class="mt-2 text-red-600 hover:underline"
          >
            💔 Remove from favourites
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- pages/Favourites.vue -->
<script setup>
import { onMounted } from "vue";
import { useFavouriteStore } from "@/store/wishlistStore";
import { session } from "@/utils"; // or use sessionStorage directly

const favouriteStore = useFavouriteStore();

onMounted(() => {
  const sessionData = session.get("sessionData"); // Or use sessionStorage.getItem()
  if (sessionData) {
    favouriteStore.fetchFavourites();
  }
});

const toggle = (product) => favouriteStore.toggleFavourite(product);
</script>
