<template>
  <div class="w-full md:container mx-auto p-4 sm:p-6 lg:p-24">
    <h1 class="text-3xl font-bold mb-8 text-gray-900">Your Orders</h1>

    <div v-if="loading" class="space-y-6">
      <div
        v-for="n in 3"
        :key="n"
        class="bg-white shadow-md rounded-xl p-6 border border-gray-200 animate-pulse"
      >
        <div class="flex justify-between gap-4">
          <div class="w-1/2 space-y-4">
            <div class="h-4 bg-gray-200 rounded w-1/3"></div>
            <div class="h-4 bg-gray-200 rounded w-2/3"></div>
            <div class="h-4 bg-gray-200 rounded w-1/3"></div>
            <div class="h-4 bg-gray-200 rounded w-3/4"></div>
            <div class="h-4 bg-gray-200 rounded w-1/3"></div>
            <div class="h-4 bg-gray-200 rounded w-full"></div>
          </div>
          <div class="w-1/2 space-y-4">
            <div class="h-4 bg-gray-200 rounded w-1/4"></div>
            <div class="flex gap-4">
              <div class="w-24 h-24 bg-gray-200 rounded-md"></div>
              <div class="space-y-2 flex-1">
                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                <div class="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
            <div class="h-4 bg-gray-200 rounded w-1/3"></div>
            <div class="h-6 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="orders.length === 0" class="text-center py-12">
      <div class="text-gray-600">
        <svg
          class="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 3h18M3 3v18M3 3l18 18M3 21h18M3 21V3m18 0v18"
          />
        </svg>
        <p class="mt-4 text-lg font-medium">No orders found.</p>
        <p class="mt-2 text-sm">Start shopping to see your orders here!</p>
      </div>
    </div>

    <!-- Orders List -->
    <div v-else class="space-y-6">
      <div
        v-for="order in orders"
        :key="order.id"
        class="bg-white shadow-sm rounded-xl p-6 border border-gray-200 transition-all hover:shadow-xl"
      >
        <div class="flex flex-col sm:flex-row justify-between gap-6">
          <div class="w-full sm:w-1/2 space-y-4">
            <div>
              <p class="font-semibold text-gray-700">Order Number</p>
              <p class="text-gray-600">
                {{ order.order_number }}
              </p>
            </div>
            <div>
              <p class="font-semibold text-gray-700">Order Date</p>
              <p class="text-gray-600">
                {{ formatDate(order.created_at) }}
              </p>
            </div>
            <div>
              <p class="font-semibold text-gray-700">Shipping Address</p>
              <p class="text-gray-600">
                {{ order.address }}
              </p>
            </div>
          </div>
          <div class="w-full sm:w-1/2 space-y-4">
            <p class="font-semibold text-gray-700">Products</p>
            <div
              v-for="product in order.product_purchased"
              :key="product.id"
              class="flex gap-4 mt-2"
            >
              <img
                :src="product.product_image"
                :alt="product.product_name"
                class="w-24 h-24 rounded-md object-cover border border-gray-200"
              />
              <div>
                <p class="text-gray-600 font-medium">
                  {{ product.product_name }} (Qty: {{ product.quantity }})
                </p>
                <p class="text-gray-500">{{ formatPrice(product.amount) }}</p>
              </div>
            </div>
            <div class="pt-4 border-t border-gray-200">
              <p class="font-semibold text-gray-700">Total Amount</p>
              <p class="text-xl font-bold text-gray-800">
                {{ formatPrice(order.total_amount) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { allOrders } from "@/services/auth.service";

const loading = ref(false);
const orders = ref([]);

onMounted(async () => {
  loading.value = true;
  try {
    const response = await allOrders();
    if (response.status === 200) {
      orders.value = response.data.orders;
    } else {
      console.error("Failed to fetch orders:", response.data.message);
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
  loading.value = false;
});

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatPrice = (amount) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  })
    .format(amount)
    .replace("NGN", "")
    .trim();
};
</script>

<style scoped>
.animate-pulse {
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
