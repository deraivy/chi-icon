<template>
  <div
    class="overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer"
    @click="goToDetails"
  >
    <div class="relative group">
      <img
        :src="product.image"
        :alt="product.name"
        class="h-48 sm:h-56 md:h-64 lg:h-80 w-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105 bg-gray-100"
        loading="lazy"
      />

      <!-- Action Icons -->
      <div
        class="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-row items-center justify-center gap-2 z-10 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300"
      >
        <!-- Add to Cart -->
        <button
          @click.stop="addToCart"
          :disabled="product.out_of_stock"
          class="p-2.5 bg-white/95 backdrop-blur-sm rounded-full shadow-sm text-gray-700 hover:text-white hover:bg-[#1e3a8a] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:ring-opacity-50"
          aria-label="Add to Cart"
        >
          <div class="relative group/button">
            <AppIcon
              icon="bx:cart"
              class="text-xl transition-colors duration-300"
            />
            <span
              class="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 hidden group-hover/button:block px-2 py-1 text-xs font-medium text-white bg-[#1e3a8a] rounded-md whitespace-nowrap transition-opacity duration-200"
            >
              Add to Cart
            </span>
          </div>
        </button>

        <!-- Add to Favorites -->
        <button
          type="button"
          @click.stop="addToFavourite"
          class="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md text-gray-700 hover:text-white hover:bg-[#1e3a8a] transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none"
          aria-label="Add to Favorites"
        >
          <div class="relative group/button">
            <AppIcon
              icon="icon-park-outline:like"
              class="text-xl transition-colors duration-300"
            />
            <span
              class="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 hidden group-hover/button:block px-2 py-1 text-xs font-medium text-white bg-[#1e3a8a] rounded-md whitespace-nowrap transition-opacity duration-200"
            >
              Favourite
            </span>
          </div>
        </button>

        <!-- Quick View -->
        <button
          @click.stop="goToDetails"
          class="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md text-gray-700 hover:text-white hover:bg-[#1e3a8a] transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none"
          aria-label="Quick View"
        >
          <div class="relative group/button">
            <AppIcon
              icon="basil:eye-outline"
              class="text-xl transition-colors duration-300"
            />
            <span
              class="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 hidden group-hover/button:block px-2 py-1 text-xs font-medium text-white bg-[#1e3a8a] rounded-md whitespace-nowrap transition-opacity duration-200"
            >
              Quick View
            </span>
          </div>
        </button>
      </div>
    </div>

    <!-- Product Info -->
    <div class="py-5">
      <p
        @click.stop="goToDetails"
        class="text-base font-semibold text-gray-800 truncate capitalize tracking-tight hover:text-[#1e3a8a] transition-colors duration-200"
      >
        {{ product.name }}
      </p>
      <div class="flex justify-between items-center">
        <span class="text-lg font-bold text-red-600">
          ₦{{ product.price.toLocaleString("en-NG") }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter, defineProps } from "vue-router";
import { useCartStore } from "@/store/cartStore";
import { useFavouriteStore } from "@/store/wishlistStore";
import { useToast } from "vue-toastification";
import { session } from "@/utils";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});
const toast = useToast();
const router = useRouter();
const cartStore = useCartStore();
const favouriteStore = useFavouriteStore();

function addToCart() {
  cartStore.addToCart(props.product);
  toast.success(`${props.product.name} added to cart!`);
}

function addToFavourite() {
  const sessionData = session.get("sessionData");
  const token = sessionData?.access_token;

  if (!token) {
    toast.warning("Please log in to add to favourites");
    router.push("/login");
    return;
  }

  favouriteStore.toggleFavourite(props.product);
}

function goToDetails() {
  router.push(`/products-details/${props.product.id}`);
}
</script>
