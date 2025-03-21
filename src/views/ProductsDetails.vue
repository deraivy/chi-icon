<template>
  <div class="bg-gray-100 min-h-screen">
    <!-- Breadcrumbs -->

    <!-- Loading State -->
    <div v-if="loading" class="container mx-auto px-4 py-8 text-center">
      <div class="flex justify-center items-center">
        <div
          class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"
        ></div>
        <span class="ml-2 text-gray-700">Loading...</span>
      </div>
    </div>

    <!-- Product Not Found State -->
    <div v-else-if="!product" class="container mx-auto px-4 py-8 text-center">
      <h2 class="text-2xl font-semibold text-gray-700">Product not found</h2>
      <p class="mt-2 text-gray-500">
        The product you're looking for doesn't exist.
      </p>
    </div>

    <!-- Product Details -->
    <div v-else class="container mx-auto px-4 py-8">
      <div class="flex flex-wrap -mx-4">
        <!-- Product Image -->
        <div class="w-full md:w-1/2 px-4 mb-8">
          <div class="w-full h-64 md:h-96">
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-full object-cover rounded-lg shadow-md"
            />
          </div>
        </div>

        <!-- Product Details -->
        <div class="w-full md:w-1/2 px-4">
          <h2 class="text-2xl md:text-3xl font-bold mb-2">
            {{ product.name }}
          </h2>
          <p class="text-gray-600 mb-4">Model: {{ product.model }}</p>
          <div class="mb-4">
            <span class="text-2xl font-bold text-green-600 mr-2"
              >${{ formattedPrice }}</span
            >
          </div>
          <p class="text-gray-700 mb-6 leading-relaxed">
            {{ product.description }}
          </p>

          <!-- Color -->
          <div class="mb-6">
            <div class="flex items-center space-x-2">
              <div class="text-sm font-medium text-gray-700">Color:</div>
              <div
                class="w-8 h-8 shadow-md rounded-full border border-gray-300"
                :style="{ backgroundColor: product.color }"
              ></div>
              <div class="text-sm text-gray-700">{{ product.color }}</div>
            </div>
          </div>

          <!-- Quantity Selector -->
          <div class="mb-6 flex items-center">
            <label for="quantity" class="text-sm font-medium text-gray-700 mr-2"
              >Quantity:</label
            >
            <button
              @click="quantity--"
              :disabled="quantity <= 1"
              class="px-3 py-1 bg-gray-200 rounded-l hover:bg-gray-300 disabled:opacity-50"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              v-model="quantity"
              class="w-16 text-center border-t border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              @click="quantity++"
              class="px-3 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <!-- Action Buttons -->
          <div class="flex space-x-4">
            <button
              class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              aria-label="Add to cart"
            >
              Add to Cart
            </button>
            <button
              class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              aria-label="Buy now"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <!-- Specifications -->
      <div v-if="specifications.length > 0" class="mt-8">
        <h3 class="text-lg font-semibold mb-2">Specifications:</h3>
        <ul class="list-disc list-inside text-gray-700">
          <li v-for="(spec, index) in specifications" :key="index">
            {{ spec }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useProductStore } from "@/store/ProductStore";
import { storeToRefs } from "pinia";

const route = useRoute();
const productStore = useProductStore();
const quantity = ref(1);

const { selectedProduct: product, loading } = storeToRefs(productStore);

// Format price with commas
const formattedPrice = computed(() => product.value.price.toLocaleString());

// Filter and list non-empty specifications
const specifications = computed(() => {
  const specs = [];
  for (let i = 1; i <= 15; i++) {
    const spec = product.value[`specification_${i}`];
    if (spec && spec.trim() !== "") {
      specs.push(spec);
    }
  }
  return specs;
});

const fetchProduct = () => {
  const productId = route.params.id;
  productStore.fetchProductById(productId);
};

onMounted(fetchProduct);
</script>
