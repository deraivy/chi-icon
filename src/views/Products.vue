<template>
  <div class="min-h-screen bg-gray-100">
    <section class="relative w-full h-[25vh] md:h-[35vh] lg:h-[45vh]">
      <img
        src="/images/header.jpg"
        alt="Hero background"
        class="w-full h-full object-cover"
      />
      <div class="absolute top-0 left-0 w-full h-full bg-black/30"></div>
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold z-10"
      >
        Products
      </div>
    </section>

    <!-- Main Content -->
    <main class="w-full md:container mx-auto px-4 md:px-0 py-12">
      <!-- Filter Toggle Button for Mobile -->
      <div class="md:hidden flex justify-between items-center mb-6">
        <h3 class="text-xl font-semibold text-gray-900">Products</h3>
        <button
          @click="toggleFilter"
          class="px-4 py-2 bg-[#EB5E28] text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707v3.586a1 1 0 01-.293.707l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 01-.293-.707v-3.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            ></path>
          </svg>
          Filter
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-8 gap-6">
        <!-- Filter Panel -->
        <div
          :class="[
            'fixed inset-y-0 left-0 z-50 w-5/5 sm:w-96 h-auto bg-white shadow-xl md:bg-transparent md:shadow-none md:rounded-xl transform transition-transform duration-300 ease-in-out md:static md:z-0 md:w-auto md:col-span-2 md:translate-x-0',
            { 'translate-x-0': showFilter, '-translate-x-full': !showFilter },
          ]"
        >
          <Filter @close="toggleFilter" />
        </div>

        <!-- Overlay for Mobile -->
        <div
          v-if="showFilter"
          class="fixed inset-0 bg-black/50 z-40 md:hidden"
          @click="toggleFilter"
        ></div>

        <!-- Products Grid -->
        <div class="col-span-1 md:col-span-6">
          <div class="mb-6 flex justify-end items-end">
            <p class="text-sm text-left text-gray-500">
              Showing {{ products.length }} of {{ totalProducts }} products
            </p>
          </div>
          <section class="w-full">
            <div
              v-if="loading"
              class="flex items-center justify-center h-[70vh]"
            >
              <Loader />
            </div>

            <div
              v-else-if="products?.length"
              class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4"
            >
              <ProductCard
                v-for="product in products"
                :key="product.id"
                :product="product"
                class="w-full"
              />
            </div>

            <div
              v-else
              class="text-center py-12 sm:py-16 bg-white rounded-lg shadow-sm border border-gray-100"
              role="alert"
            >
              <h2 class="text-xl sm:text-2xl font-semibold text-gray-800">
                No products available
              </h2>
              <p class="mt-2 text-gray-500 text-sm sm:text-base">
                Try adjusting your filters or check back later for new items
              </p>
            </div>

            <VueAwesomePaginate
              :total-items="totalProducts"
              :items-per-page="perPage"
              :max-pages-shown="5"
              v-model="currentPage"
              @update:modelValue="onPageChange"
              class="mt-8"
            />
          </section>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useProductStore } from "@/store/ProductStore";
import ProductCard from "@/components/ProductCard.vue";
import Loader from "@/components/Loader.vue";
import Filter from "@/components/Filter.vue";

const productStore = useProductStore();
const { products, loading, currentPage, perPage, totalProducts } =
  storeToRefs(productStore);

// Filter toggle state for mobile
const showFilter = ref(false);

function toggleFilter() {
  showFilter.value = !showFilter.value;
}

function onPageChange(page) {
  productStore.fetchProducts(page, perPage.value);
}

onMounted(() => {
  productStore.fetchProducts(currentPage.value, perPage.value);
});
</script>

<style scoped>
.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  column-gap: 8px;
  width: 100%;
}

.paginate-buttons {
  height: 32px;
  width: 32px;
  border-radius: 8px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.paginate-buttons:hover {
  background-color: #d8d8d8;
}

.active-page {
  background-color: #2a6e55;
  border: 1px solid #2a6e55;
  color: white;
}

.active-page:hover {
  background-color: #0a7c52;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
