<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div
      class="bg-gradient-to-br from-gray-600 via-red-700 to-gray-800 w-full h-64 flex items-center relative overflow-hidden"
    >
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.2)_1px,transparent_0)] bg-[size:24px_24px] opacity-10"
      ></div>
      <div class="text-center z-10 mx-auto px-4">
        <h2
          class="text-4xl md:text-5xl text-white font-bold tracking-tight drop-shadow-md"
        >
          Products
        </h2>
      </div>
    </div>

    <!-- Main Content -->
    <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Filters Sidebar -->
        <div class="lg:w-1/4">
          <!-- Desktop Filters (lg and up) -->
          <div class="hidden lg:block">
            <div class="flex flex-col top-0">
              <!-- Section Title -->
              <div class="flex justify-between items-center mb-6">
                <h3 class="text-2xl font-bold text-gray-900">Filter</h3>
                <button
                  @click="clearFilters"
                  class="text-sm font-medium text-red-600 hover:text-red-800 transition-colors duration-200"
                >
                  Clear Filters
                </button>
              </div>

              <!-- Category Filter -->
              <div class="mb-8">
                <label
                  class="block text-lg font-medium text-gray-700 mb-3 cursor-pointer flex items-center justify-between"
                  @click="isCategoryDropdownOpen = !isCategoryDropdownOpen"
                >
                  Category
                  <svg
                    :class="{ 'rotate-180': isCategoryDropdownOpen }"
                    class="w-5 h-5 text-gray-500 transition-transform duration-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </label>
                <div
                  v-show="isCategoryDropdownOpen"
                  class="text-base space-y-3 mt-2 transition-all duration-300 ease-in-out"
                >
                  <p
                    v-for="category in categories"
                    :key="category"
                    @click="
                      selectedCategory = category;
                      applyFilters();
                    "
                    class="text-gray-600 hover:text-blue-600 cursor-pointer transition-colors duration-200"
                  >
                    {{ category }}
                  </p>
                </div>
              </div>

              <!-- Price Range -->
              <div class="mb-8">
                <label
                  class="block text-lg font-medium text-gray-700 mb-3 cursor-pointer flex items-center justify-between"
                  @click="isPriceDropdownOpen = !isPriceDropdownOpen"
                >
                  Price Range (₦)
                  <svg
                    :class="{ 'rotate-180': isPriceDropdownOpen }"
                    class="w-5 h-5 text-gray-500 transition-transform duration-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </label>
                <div
                  v-show="isPriceDropdownOpen"
                  class="flex gap-4 mt-2 transition-all duration-300 ease-in-out"
                >
                  <input
                    type="number"
                    v-model.number="minPrice"
                    placeholder="Min"
                    class="w-1/2 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-base text-gray-700 placeholder-gray-400 transition-all duration-200"
                    @input="applyFilters"
                  />
                  <input
                    type="number"
                    v-model.number="maxPrice"
                    placeholder="Max"
                    class="w-1/2 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-base text-gray-700 placeholder-gray-400 transition-all duration-200"
                    @input="applyFilters"
                  />
                </div>
              </div>

              <!-- Color Filter -->
              <div class="mb-8">
                <label
                  class="block text-lg font-medium text-gray-700 mb-3 cursor-pointer flex items-center justify-between"
                  @click="isColorDropdownOpen = !isColorDropdownOpen"
                >
                  Color
                  <svg
                    :class="{ 'rotate-180': isColorDropdownOpen }"
                    class="w-5 h-5 text-gray-500 transition-transform duration-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </label>
                <div
                  v-show="isColorDropdownOpen"
                  class="grid grid-cols-2 gap-4 mt-2 transition-all duration-300 ease-in-out"
                >
                  <label
                    v-for="color in colors"
                    :key="color"
                    class="flex items-center"
                  >
                    <input
                      type="checkbox"
                      :value="color"
                      v-model="selectedColors"
                      @change="applyFilters"
                      class="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 border-gray-300 transition-all duration-200"
                    />
                    <span class="ml-2 text-base text-gray-600">{{
                      color
                    }}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Mobile Filters (below lg) -->
          <div class="block lg:hidden">
            <!-- Mobile Filter Button -->
            <button
              @click="isFilterOpen = true"
              class="bg-blue-600 text-white py-2 px-6 rounded-lg mb-4"
            >
              Filters
            </button>

            <!-- Sidebar -->
            <div>
              <div
                :class="[
                  'fixed inset-0 bg-black bg-opacity-80 z-40 transition-opacity duration-300',
                  isFilterOpen
                    ? 'opacity-100'
                    : 'opacity-0 pointer-events-none',
                ]"
                @click="isFilterOpen = false"
              ></div>
              <div
                :class="[
                  'fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out',
                  isFilterOpen ? 'translate-x-0' : '-translate-x-full',
                ]"
              >
                <div class="p-6">
                  <div class="flex justify-between items-center mb-6">
                    <h3 class="text-2xl font-bold text-gray-900">Filter</h3>
                    <button
                      @click="isFilterOpen = false"
                      class="text-red-600 text-lg"
                    >
                      ✕
                    </button>
                  </div>
                  <!-- Category Filter -->
                  <div class="mb-6">
                    <h4 class="font-medium text-gray-700 mb-2">Category</h4>
                    <select
                      v-model="selectedCategory"
                      @change="applyFilters"
                      class="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                    >
                      <option value="">All</option>
                      <option
                        v-for="category in categories"
                        :key="category"
                        :value="category"
                      >
                        {{ category }}
                      </option>
                    </select>
                  </div>
                  <!-- Price Range Filter -->
                  <div class="mb-6">
                    <h4 class="font-medium text-gray-700 mb-2">
                      Price Range (₦)
                    </h4>
                    <div class="flex gap-2">
                      <input
                        type="number"
                        v-model.number="minPrice"
                        placeholder="Min"
                        class="w-1/2 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-gray-700 placeholder-gray-400 transition-all duration-200"
                        @input="applyFilters"
                      />
                      <input
                        type="number"
                        v-model.number="maxPrice"
                        placeholder="Max"
                        class="w-1/2 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-gray-700 placeholder-gray-400 transition-all duration-200"
                        @input="applyFilters"
                      />
                    </div>
                  </div>
                  <!-- Color Filter -->
                  <div class="mb-6">
                    <h4 class="font-medium text-gray-700 mb-2">Color</h4>
                    <div class="grid grid-cols-2 gap-2">
                      <label
                        v-for="color in colors"
                        :key="color"
                        class="flex items-center"
                      >
                        <input
                          type="checkbox"
                          :value="color"
                          v-model="selectedColors"
                          @change="applyFilters"
                          class="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 border-gray-300 transition-all duration-200"
                        />
                        <span class="ml-2 text-gray-600">{{ color }}</span>
                      </label>
                    </div>
                  </div>
                  <button
                    @click="
                      clearFilters;
                      isFilterOpen = false;
                    "
                    class="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Products Section -->
        <div class="w-full lg:w-4/4">
          <!-- Loading State -->
          <div v-if="loading" class="flex justify-center items-center h-64">
            <div class="flex items-center gap-4">
              <svg
                class="animate-spin h-8 w-8 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0L4 4z"
                ></path>
              </svg>
              <span class="text-gray-600 text-lg">Loading collections...</span>
            </div>
          </div>

          <!-- Products Grid -->
          <div
            v-else-if="displayProducts.length > 0"
            class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            <ProductCard
              v-for="product in displayProducts"
              :key="product.id"
              :product="product"
            />
          </div>

          <!-- No Results -->
          <div
            v-else
            class="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100"
          >
            <h3 class="text-xl font-semibold text-gray-800">
              No products available
            </h3>
            <p class="mt-2 text-gray-500">Check back later for new items</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed, ref } from "vue";
import { storeToRefs } from "pinia";
import ProductCard from "../components/ProductCard.vue";
import { useProductStore } from "../store/ProductStore";

export default {
  name: "ProductsView",
  components: {
    ProductCard,
  },
  setup() {
    const productStore = useProductStore();
    const {
      products,
      loading,
      selectedCategory,
      minPrice,
      maxPrice,
      selectedColors,
      colors,
      categories,
    } = storeToRefs(productStore);

    // Independent dropdown states
    const isCategoryDropdownOpen = ref(false);
    const isPriceDropdownOpen = ref(false);
    const isColorDropdownOpen = ref(false);
    const isFilterOpen = ref(false); // For mobile sidenav

    // Compute display products based on filters
    const displayProducts = computed(() => {
      let result = [...products.value];

      // Apply category filter
      if (selectedCategory.value) {
        result = result.filter(
          (product) => product.category === selectedCategory.value
        );
      }

      // Apply price filter
      if (minPrice.value || maxPrice.value) {
        result = result.filter((product) => {
          const price = product.price;
          const min = minPrice.value || 0;
          const max = maxPrice.value || Infinity;
          return price >= min && price <= max;
        });
      }

      // Apply color filter
      if (selectedColors.value.length > 0) {
        result = result.filter(
          (product) =>
            product.colors &&
            selectedColors.value.some((color) => product.colors.includes(color))
        );
      }

      return result;
    });

    // Fetch products on mount
    onMounted(() => {
      productStore.fetchProducts();
    });

    // Apply filters method
    const applyFilters = () => {
      // The computed property will automatically update
    };

    // Clear filters method
    const clearFilters = () => {
      selectedCategory.value = null; // Reset category
      minPrice.value = null; // Reset min price
      maxPrice.value = null; // Reset max price
      selectedColors.value = []; // Reset selected colors
      applyFilters(); // Trigger filter update
    };

    return {
      products,
      displayProducts,
      loading,
      selectedCategory,
      minPrice,
      maxPrice,
      selectedColors,
      colors,
      categories,
      applyFilters,
      clearFilters,
      isCategoryDropdownOpen,
      isPriceDropdownOpen,
      isColorDropdownOpen,
      isFilterOpen,
    };
  },
};
</script>
