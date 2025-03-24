<template>
  <div class="w-full mx-auto overflow-hidden transition-all duration-300">
    <div class="relative group">
      <img
        :src="product.image"
        :alt="product.name"
        class="h-48 lg:h-80 md:h-80 sm:h-64 w-full rounded-lg object-cover transition-transform duration-300 bg-gray-100"
        loading="lazy"
      />
      <div class="absolute top-3 right-2 flex flex-col gap-2">
        <!-- Add to Cart (Visible on Hover) -->

        <div
          @click.prevent="addToCart(product)"
          class="w-9 h-9 bg-white/90 flex items-center justify-center rounded-full shadow-sm transition-all duration-300 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:bg-red-500 hover:shadow-md hover:scale-110"
        >
          <img
            src="/icons/cart.svg"
            alt="Shopping Cart"
            class="w-5 h-5 text-gray-700 group-hover:text-red-600 transition-colors duration-200"
          />
        </div>
        <!-- Favorite (Visible on Hover) -->
        <div
          class="w-9 h-9 bg-white/90 flex items-center justify-center rounded-full shadow-sm transition-all duration-300 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:bg-red-500 hover:shadow-md hover:scale-110"
        >
          <img
            src="/icons/love.svg"
            alt="Shopping Cart"
            class="w-5 h-5 text-gray-700 group-hover:text-red-600 transition-colors duration-200"
          />
        </div>
        <!-- View (Visible on Hover) -->
        <router-link
          :to="`/products-details/${product.id}`"
          class="w-9 h-9 bg-white/90 flex items-center justify-center rounded-full shadow-sm transition-all duration-300 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:bg-red-500 hover:shadow-md hover:scale-110"
        >
          <img
            src="/icons/eye.svg"
            alt="Shopping Cart"
            class="w-5 h-5 text-gray-700 group-hover:text-red-600 transition-colors duration-200"
          />
        </router-link>
      </div>
    </div>
    <div class="py-4">
      <p
        class="text-sm font-medium text-center text-gray-800 truncate capitalize tracking-wide hover:text-rose-600 transition-colors duration-200"
      >
        {{ product.name }}
      </p>

      <p class="text-lg text-center font-bold text-gray-700">
        ₦{{ product.price.toLocaleString("en-NG") }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useCartStore } from "@/store/cartStore";

defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const cartStore = useCartStore();
const addToCart = (product) => {
  cartStore.addToCart(product);
  console.log(`${product.name} added to cart!`);
};
</script>

<style scoped>
/* Tailwind handles everything, no custom CSS needed */
</style>
