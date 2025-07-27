<template>
  <div
    class="p-4 sm:p-6 w-full h-full md:h-auto overflow-y-auto md:overflow-visible transition-all duration-300"
  >
    <!-- Header with Close Button for Mobile -->
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-xl sm:text-2xl font-bold text-gray-900">Filter</h3>
      <div class="flex items-center gap-4">
        <button
          @click="clearFilters"
          class="hidden md:block text-sm sm:text-base font-semibold text-red-600 hover:text-red-800 transition-colors duration-200"
        >
          Clear All
        </button>
        <button
          @click="$emit('close')"
          class="md:hidden bg-gray-100 p-2 rounded-full text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Category Filter -->
    <div>
      <div class="flex justify-between items-center mb-1">
        <h2 class="text-sm sm:text-base font-semibold uppercase text-gray-700">
          Categories
        </h2>
        <button
          @click="showCategories = !showCategories"
          class="text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          <span class="text-lg">{{ showCategories ? "−" : "+" }}</span>
        </button>
      </div>
      <div class="border-b border-gray-200 mb-3"></div>
      <div
        v-show="showCategories"
        class="flex flex-col gap-2 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 mb-6"
      >
        <span
          v-for="category in categories"
          :key="category.id"
          @click="updateFilter('category', category.id)"
          class="cursor-pointer py-2 rounded-lg text-sm sm:text-base transition-colors duration-200"
          :class="{
            'bg-gray-200 text-[#10203f] font-medium':
              selectedCategory === category.id,
            'hover:bg-gray-100 text-gray-700': selectedCategory !== category.id,
          }"
        >
          {{ category.name }}
        </span>
      </div>
    </div>

    <!-- Color Filter -->
    <div>
      <div class="flex justify-between items-center mb-1">
        <h2 class="text-sm sm:text-base font-semibold uppercase text-gray-700">
          Colors
        </h2>
        <button
          @click="showColors = !showColors"
          class="text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          <span class="text-lg">{{ showColors ? "−" : "+" }}</span>
        </button>
      </div>
      <div class="border-b border-gray-200 mb-3"></div>
      <div
        v-show="showColors"
        class="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6"
      >
        <div
          v-for="color in colors"
          :key="color"
          @click="updateFilter('color', color)"
          class="cursor-pointer w-7 h-7 py-2 rounded-full border-2 transition-all duration-200 relative group"
          :style="{ backgroundColor: color }"
          :class="{
            'border-blue-500 ring-2 ring-blue-300': selectedColor === color,
            'border-gray-300 hover:border-gray-400': selectedColor !== color,
          }"
          :aria-label="`Select color ${color}`"
        >
          <span
            class="absolute text-black text-sm rounded py-1 px-2 -top-0 left-8"
          >
            {{ color }}
          </span>
        </div>
      </div>
    </div>

    <!-- Price Range -->
    <div>
      <div class="flex justify-between items-center mb-1">
        <h2 class="text-sm sm:text-base font-semibold uppercase text-gray-700">
          Price Range
        </h2>
        <button
          @click="showPrice = !showPrice"
          class="text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          <span class="text-lg">{{ showPrice ? "−" : "+" }}</span>
        </button>
      </div>
      <div class="border-b border-gray-200 mb-3"></div>
      <div
        v-show="showPrice"
        class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"
      >
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700"
            >Min Price</label
          >
          <input
            type="number"
            v-model.number="minPrice"
            @change="updateFilter('minPrice', minPrice)"
            class="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="0"
          />
        </div>
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700"
            >Max Price</label
          >
          <input
            type="number"
            v-model.number="maxPrice"
            @change="updateFilter('maxPrice', maxPrice)"
            class="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="1000"
          />
        </div>
      </div>
    </div>

    <!-- Sort By -->
    <div>
      <div class="flex justify-between items-center mb-1">
        <h2 class="text-sm sm:text-base font-semibold uppercase text-gray-700">
          Sort By
        </h2>
        <button
          @click="sort = !sort"
          class="text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          <span class="text-lg">{{ sort ? "−" : "+" }}</span>
        </button>
      </div>
      <div class="border-b border-gray-200 mb-3"></div>
      <select
        v-show="sort"
        v-model="sortBy"
        @change="updateFilter('sortBy', sortBy)"
        class="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 mb-6"
      >
        <option value="name">Name</option>
        <option value="model">Model</option>
        <option value="price">Price</option>
        <option value="created_at">Date Added</option>
      </select>
    </div>

    <!-- Sort Order -->
    <div>
      <div class="flex justify-between items-center mb-1">
        <h2 class="text-sm sm:text-base font-semibold uppercase text-gray-700">
          Sort Order
        </h2>
        <button
          @click="sortOrders = !sortOrders"
          class="text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          <span class="text-lg">{{ sortOrders ? "−" : "+" }}</span>
        </button>
      </div>
      <div class="border-b border-gray-200 mb-3"></div>

      <select
        v-show="sortOrders"
        v-model="sortOrder"
        @change="updateFilter('sortOrder', sortOrder)"
        class="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 mb-6"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>

    <!-- Clear Filters Button -->
    <div class="mt-6">
      <button
        @click="clearFilters"
        class="md:hidden w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
      >
        Clear All Filters
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useProductStore } from "../store/ProductStore";

const productStore = useProductStore();
const {
  categories,
  colors,
  selectedCategory,
  selectedColor,
  minPrice,
  maxPrice,
  // model,
  // name,
  sortBy,
  sortOrder,
} = storeToRefs(productStore);

// Collapsible state for sections
const showCategories = ref(true);
const showPrice = ref(true);
const sortOrders = ref(true);
const sort = ref(true);
const showColors = ref(true);

const updateFilter = (key, value) => {
  productStore.updateFilters({ [key]: value });
};

const clearFilters = () => {
  productStore.resetFilters();
};

onMounted(() => {
  productStore.fetchCategories();
  productStore.fetchProducts();
});
</script>

<style scoped>
/* Custom scrollbar styling for Tailwind */
.scrollbar-thin {
  scrollbar-width: thin;
}

.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #9ca3af;
  border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style>
