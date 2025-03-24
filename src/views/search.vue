<template>
  <div class="min-h-screen bg-gray-50 py-16">
    <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1 class="text-2xl font-bold text-gray-900 mb-6">
        Search Results for "{{ query }}"
      </h1>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <div
          v-for="product in searchResults"
          :key="product.id"
          class="p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
        >
          <router-link :to="`/products/${product.id}`">
            <p class="text-gray-800 font-semibold text-lg">
              {{ product.name }}
            </p>
            <p class="text-gray-600 text-base font-medium">
              ₦{{ product.price.toLocaleString() }}
            </p>
          </router-link>
        </div>
      </div>
      <div v-if="!searchResults.length" class="text-center text-gray-500 mt-6">
        No results found for "{{ query }}".
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useProductStore } from "../store/ProductStore";
import { storeToRefs } from "pinia";

export default {
  name: "SearchView",
  setup() {
    const route = useRoute();
    const productStore = useProductStore();
    const { products } = storeToRefs(productStore);

    const query = computed(() => route.query.q || "");
    const searchResults = computed(() =>
      products.value.filter((product) =>
        product.name.toLowerCase().includes(query.value.toLowerCase())
      )
    );

    return { query, searchResults };
  },
};
</script>
