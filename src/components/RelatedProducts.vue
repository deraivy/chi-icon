<template>
  <div>
    <div v-if="isLoading" class="text-center">Loading...</div>

    <div v-else-if="error" class="text-center text-red-500">
      {{ error }}
    </div>

    <div
      v-else-if="products.length > 0"
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>

    <div v-else class="text-center text-gray-500">
      No related products found.
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import ProductCard from "./ProductCard.vue";

defineProps({
  products: {
    type: Array,
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: null,
  },
});
</script>
