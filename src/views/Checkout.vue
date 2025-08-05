<!-- pk_test_e92a697f3134cac79f13fd5dd9009c10f7db82ca -->

<template>
  <section class="w-full max-w-7xl mx-auto px-4 py-8">
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <!-- Shipping Form -->
      <div class="lg:col-span-3 bg-white p-6 rounded-xl">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Shipping Address</h2>
        <p class="text-gray-500 mb-6">
          Enter the address where you want your order delivered.
        </p>

        <form @submit.prevent="payWithPaystack" class="space-y-6">
          <div>
            <label class="block mb-1 font-medium text-gray-700">Country</label>
            <select
              v-model="form.country"
              required
              class="w-full p-3 border border-gray-200 rounded-lg"
            >
              <option value="Nigeria">Nigeria</option>
            </select>
          </div>

          <div>
            <label class="block mb-1 font-medium text-gray-700">Address</label>
            <input
              v-model="form.address"
              type="text"
              required
              class="w-full p-3 border border-gray-200 rounded-lg"
            />
          </div>

          <div>
            <label class="block mb-1 font-medium text-gray-700"
              >Apartment, suite, etc. (optional)</label
            >
            <input
              v-model="form.apartment"
              type="text"
              class="w-full p-3 border border-gray-200 rounded-lg"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block mb-1 font-medium text-gray-700">City</label>
              <input
                v-model="form.city"
                type="text"
                required
                class="w-full p-3 border border-gray-200 rounded-lg uppercase"
              />
            </div>
            <div>
              <label class="block mb-1 font-medium text-gray-700">State</label>
              <select
                v-model="form.state"
                required
                class="w-full p-3 border border-gray-200 rounded-lg"
              >
                <option value="Lagos">Lagos</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block mb-1 font-medium text-gray-700">Phone</label>
            <input
              v-model="form.phone"
              type="tel"
              required
              class="w-full p-3 border border-gray-200 rounded-lg"
            />
          </div>

          <div class="flex items-center gap-3">
            <input
              v-model="form.sameBilling"
              type="checkbox"
              id="sameBilling"
              class="h-5 w-5 text-indigo-600 border-gray-300 rounded"
            />
            <label for="sameBilling" class="text-sm text-gray-700"
              >Use same address for billing</label
            >
          </div>

          <button
            type="submit"
            class="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
          >
            Pay Now
          </button>
        </form>
      </div>

      <!-- Order Summary -->
      <div class="bg-gray-50 p-6 rounded-xl lg:col-span-2">
        <h2 class="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>

        <!-- Loading -->
        <div v-if="isLoading" class="animate-pulse">
          <div class="flex space-x-4 py-4">
            <div class="rounded-md bg-gray-200 h-20 w-14"></div>
            <div class="flex-1 space-y-3">
              <div class="h-4 bg-gray-200 rounded w-3/4"></div>
              <div class="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>

        <!-- Error -->
        <div
          v-else-if="errorMessage"
          class="text-red-500 bg-red-50 p-4 rounded-lg"
        >
          {{ errorMessage }}
        </div>

        <!-- Empty -->
        <div
          v-else-if="!cartItems.length"
          class="text-red-500 bg-red-50 p-4 rounded-lg"
        >
          No items found in cart.
        </div>

        <!-- Items -->
        <div v-else>
          <div
            v-for="(item, index) in cartItems"
            :key="index"
            class="flex gap-4 py-4 border-b"
          >
            <img
              :src="
                item.product_image ||
                'https://via.placeholder.com/50x70.png?text=Item'
              "
              :alt="item.product_name"
              class="w-14 h-20 object-cover rounded-lg"
            />
            <div class="flex-1">
              <p class="font-medium text-gray-800">{{ item.product_name }}</p>
              <p class="text-sm text-gray-500">
                Qty: {{ item.quantity }} × ₦{{
                  item.product_price.toLocaleString()
                }}
              </p>
            </div>
            <p class="font-semibold text-gray-800">
              ₦{{ (item.product_price * item.quantity).toLocaleString() }}
            </p>
          </div>

          <div class="pt-4 text-sm mt-4">
            <div class="flex justify-between mb-2">
              <span class="text-gray-600">Subtotal</span>
              <span class="font-medium text-gray-800"
                >₦{{ cartTotal.toLocaleString() }}</span
              >
            </div>
            <div class="flex justify-between mb-2">
              <span class="text-gray-600">Delivery</span>
              <span class="text-green-600 font-semibold">{{
                deliveryFee
              }}</span>
            </div>
            <div
              class="flex justify-between mt-4 text-lg font-bold border-t pt-4"
            >
              <span class="text-gray-800">Total</span>
              <span class="text-gray-800"
                >₦{{ cartTotal.toLocaleString() }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <Teleport to="body">
      <transition name="fade">
        <div
          v-if="showSuccessModal"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div class="bg-white p-8 rounded-xl text-center max-w-md shadow-lg">
            <h2 class="text-2xl font-bold text-green-600 mb-4">
              Payment Successful!
            </h2>
            <p class="text-gray-700 mb-6">
              Thank you for your purchase. Your order has been placed.
            </p>
            <button
              @click="goToThankYouPage"
              class="bg-indigo-600 text-white py-2 px-6 rounded hover:bg-indigo-700 transition"
            >
              Continue
            </button>
          </div>
        </div>
      </transition>
    </Teleport>
  </section>
</template>

<script setup>
import { reactive, ref, onMounted, computed } from "vue";
import { getfinalCart, verifyPayment } from "@/services/auth.service";
import { useToast } from "vue-toastification";
import { useCartStore } from "../store/cartStore"; // Adjust path as needed

const toast = useToast();
const cartStore = useCartStore();

const order = ref(null);
const isLoading = ref(false);
const errorMessage = ref(null);
const showSuccessModal = ref(false);

const cartItems = computed(() => {
  if (!order.value?.data?.cart_items) return [];
  return order.value.data.cart_items.map((item) => ({
    product_name: item.product_name || "Unknown Product",
    product_price: item.product_price || item.amount || 0,
    quantity: item.quantity || 1,
    product_image: item.product_image || null,
  }));
});

const cartTotal = computed(() => order.value?.data?.total_price || 0);
const deliveryFee = computed(() =>
  order.value?.data?.delivery_fee
    ? `₦${order.value.data.delivery_fee.toLocaleString()}`
    : "Free"
);

const form = reactive({
  country: "Nigeria",
  address: "",
  apartment: "",
  city: "",
  state: "",
  phone: "",
  sameBilling: false,
});

const goToThankYouPage = () => {
  showSuccessModal.value = false;
  window.location.href = "/thank-you"; // Adjust if needed
};

onMounted(async () => {
  isLoading.value = true;
  const finalizedCartId = localStorage.getItem("finalizedCartId");
  if (!finalizedCartId) {
    errorMessage.value = "No cart found. Please add items to your cart.";
    return;
  }

  const result = await getfinalCart(finalizedCartId);
  order.value = result;

  if (!window.PaystackPop) {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
  }

  isLoading.value = false;
});

const payWithPaystack = () => {
  if (!form.address || !form.city || !form.state || !form.phone) {
    alert("Please fill all required fields.");
    return;
  }

  if (!window.PaystackPop) {
    alert("Payment gateway is still loading.");
    return;
  }

  if (!order.value?.data?.cart_ref_id) {
    alert("No cart data available.");
    return;
  }

  const fullAddress = `${form.address}${
    form.apartment ? ", " + form.apartment : ""
  }, ${form.city}, ${form.state}, ${form.phone}`;
  const email =
    order.value?.data?.user_email || sessionStorage.getItem("email");
  const name = sessionStorage.getItem("name") || "Customer";

  const handler = window.PaystackPop.setup({
    key: "pk_test_e92a697f3134cac79f13fd5dd9009c10f7db82ca", // Your Paystack public key
    email: email,
    amount: cartTotal.value * 100,
    currency: "NGN",
    ref: `ref-${Date.now()}`,
    metadata: {
      cartId: order.value.data.cart_ref_id,
      custom_fields: [
        {
          display_name: name,
          variable_name: "shipping_address",
          value: fullAddress,
        },
      ],
    },
    callback: function (response) {
      console.log("✅ Payment successful from Paystack:", response);

      const payload = {
        cart_ref_id: order.value.data.cart_ref_id,
        reference: response.reference,
        address: fullAddress,
      };

      verifyPayment(payload).then((verificationResponse) => {
        console.log("🔍 Payment verification response:", verificationResponse);

        const isVerified = verificationResponse?.data?.status === "success";

        console.log("Payment verification status:", isVerified);

        if (isVerified) {
          cartStore.clearCart();
          localStorage.removeItem("finalizedCartId");
          showSuccessModal.value = true;
          toast.success("🎉 Payment verified and order placed!");
        } else {
          toast.error("⚠️ Payment verification failed.");
        }
      });
    },

    onClose: function () {
      toast.error("Payment process was closed.");
    },
  });

  handler.openIframe();
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
