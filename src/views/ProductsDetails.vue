<template>
  <div class="bg-gray-100 min-h-screen">
    <div class="w-full md:container mx-auto px-2">
      <!-- Loading -->
      <div v-if="productStore.isLoading" class="text-center py-8">
        <Loader />
      </div>

      <!--  -->
      <div v-else-if="!product || productStore.error" class="text-center py-8">
        <h2 class="text-2xl font-semibold text-gray-700">Product not found</h2>
        <p class="mt-2 text-gray-500">
          {{
            productStore.error ||
            "The product you're looking for doesn't exist."
          }}
        </p>
      </div>

      <!-- Product Details -->
      <div v-else class="py-8">
        <div class="flex flex-wrap -mx-4">
          <div
            v-if="productImages.length > 0"
            class="w-full md:w-1/2 px-4 mb-8"
          >
            <img
              :src="product.image || 'https://via.placeholder.com/550'"
              alt="Product"
              class="w-full h-auto md:h-[500px] rounded-lg shadow-md mb-4"
              id="mainImage"
            />
            <div class="flex gap-4 py-4 justify-center overflow-x-auto">
              <img
                v-for="(image, index) in productImages"
                :key="index"
                :src="image.image || 'https://via.placeholder.com/100'"
                :alt="`${product.name} image ${index + 1}`"
                class="size-16 sm:size-20 object-fit rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                @click="product.image = image.image"
              />
            </div>
          </div>

          <!-- Details -->
          <div class="w-full md:w-1/2 px-4">
            <h2 class="text-3xl font-bold mb-2">{{ product.name }}</h2>
            <p class="text-gray-600 mb-4">SKU: {{ product.model }}</p>

            <div class="mb-4">
              <span class="text-2xl font-bold mr-2">₦{{ formattedPrice }}</span>
            </div>

            <!-- <div class="flex items-center mb-4">
              <template v-for="n in 5" :key="n">
                <svg
                  v-if="n <= 4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="size-6 text-yellow-500"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 
                      5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 
                      3.527 1.257 5.273c.271 1.136-.964 
                      2.033-1.96 1.425L12 18.354 7.373 
                      21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527
                      c-.887-.76-.415-2.212.749-2.305l5.404-.434 
                      2.082-5.005Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </template>
              <span class="ml-2 text-gray-600">4.5 (120 reviews)</span>
            </div> -->

            <!-- Description -->
            <p class="text-gray-700 mb-6">{{ product.description }}</p>

            <!-- Color -->
            <div class="mb-6">
              <h3 class="text-lg font-semibold mb-2">Color:</h3>
              <div class="flex space-x-2">
                <button
                  :style="{ backgroundColor: product.color || '#000' }"
                  class="w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                ></button>
              </div>
            </div>

            <!-- Quantity -->
            <div class="mb-6">
              <button
                @click="updateQuantity(item.product.id, item.quantity - 1)"
                :disabled="item.quantity <= 1"
                class="border rounded-md py-2 px-4 mr-2"
              >
                -
              </button>
              <span class="text-center w-8">{{ item.quantity }}</span>
              <button
                @click="updateQuantity(item.product.id, item.quantity + 1)"
                class="border rounded-md py-2 px-4 ml-2"
              >
                +
              </button>
            </div>

            <!-- Actions -->
            <div class="flex space-x-4 mb-6">
              <!-- Add to Cart Button -->
              <button
                @click="addToCart"
                class="bg-[#10203f] flex gap-2 items-center text-white px-12 py-3 rounded-full shadow-full hover:bg-[#1e3a8a] active:scale-95 transition-all duration-200 transform"
              >
                Add to Cart
              </button>

              <!-- Wishlist Button -->
              <button
                class="border border-black flex gap-2 items-center text-gray-800 p-2.5 rounded-full active:scale-95 transition-all duration-200 transform"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 
        0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733
        C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </button>
            </div>

            <!-- Specifications -->
            <div>
              <h3 class="text-lg font-semibold mb-2">Specifications:</h3>
              <ul class="list-disc list-inside text-gray-700">
                <li v-for="(spec, index) in specifications" :key="index">
                  <span class="font-medium">{{ spec.name }}:</span>
                  {{ spec.description }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Related Products -->
        <div class="mt-6">
          <h2
            class="text-2xl md:text-3xl lg:text-4xl text-center font-bold text-gray-900 mb-4"
          >
            Related Products
          </h2>
          <RelatedProducts
            v-if="productStore.relatedProducts.length > 0"
            :products="productStore.relatedProducts"
            :isLoading="productStore.isLoading"
            :error="productStore.error"
            class="mt-6"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, watch } from "vue"; // ✅ added watch
import { useRoute } from "vue-router";
import { useProductStore } from "@/store/ProductStore";
import { useCartStore } from "../store/cartStore";
import Loader from "@/components/Loader.vue";
import RelatedProducts from "@/components/RelatedProducts.vue";

// Stores
const route = useRoute();
const productStore = useProductStore();
const cartStore = useCartStore();

// Product data
const product = computed(() => productStore.selectedProduct);
const productImages = computed(() => product.value?.product_images || []);
const formattedPrice = computed(() => {
  return (
    product.value?.price?.toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) || "0.00"
  );
});

// Cart item data
const item = computed(() => {
  const found = cartStore.cartItems.find(
    (i) => i.product.id === product.value?.id
  );
  return found || { product: product.value, quantity: 1 };
});

// Methods
function updateQuantity(productId, quantity) {
  cartStore.updateQuantity(productId, quantity);
}

const specifications = computed(
  () =>
    product.value?.specifications?.map((spec) => ({
      name: spec.name,
      description: spec.description,
    })) || []
);

function addToCart() {
  cartStore.addToCart(product.value, item.value.quantity);
}

// ✅ Fetch data function
const fetchProductData = async () => {
  const productId = decodeURIComponent(route.params.id);
  if (!productId) {
    productStore.error = "Invalid product ID format";
    productStore.selectedProduct = null;
    productStore.loading = false;
    return;
  }

  await Promise.all([
    productStore.fetchProductById(productId),
    productStore.fetchRelatedProducts(productId),
  ]);
};

// ✅ Initial fetch
onMounted(fetchProductData);

// ✅ Watch for route change
watch(
  () => route.params.id,
  async (newId, oldId) => {
    if (newId !== oldId) {
      await fetchProductData();
    }
  }
);
</script>
