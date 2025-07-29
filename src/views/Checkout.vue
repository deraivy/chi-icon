<template>
  <header
    class="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 w-full h-[15vh] md:h-[25vh] lg:h-[30vh] flex items-center justify-center relative overflow-hidden"
  >
    <div class="text-center relative z-10">
      <h1
        class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight transition-all duration-300 hover:scale-105"
      >
        Checkout
      </h1>
      <nav
        class="text-sm md:text-base text-gray-700 flex items-center justify-center gap-3 mt-3"
      >
        <router-link
          to="/"
          class="hover:text-gray-900 transition-colors duration-200"
        >
          Home
        </router-link>
        <div class="bg-gray-900 w-1.5 h-1.5 rounded-full"></div>
        <a
          href="#"
          class="font-semibold hover:text-gray-900 transition-colors duration-200"
        >
          Checkout
        </a>
      </nav>
    </div>
    <div
      class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent)]"
    ></div>
  </header>

  <section class="w-full md:container mx-auto px-4">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
      <!-- Shipping Form -->
      <form @submit.prevent="payWithPaystack" class="md:col-span-2 space-y-6">
        <h2 class="text-2xl font-semibold">Shipping address</h2>
        <p class="text-gray-600">
          Enter the address where you want your order delivered.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block mb-1 font-medium text-gray-700"
              >First Name</label
            >
            <input
              v-model="form.firstName"
              type="text"
              required
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="John"
            />
          </div>
          <div>
            <label class="block mb-1 font-medium text-gray-700"
              >Last Name</label
            >
            <input
              v-model="form.lastName"
              type="text"
              required
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Doe"
            />
          </div>
        </div>

        <div>
          <label class="block mb-1 font-medium text-gray-700">Email</label>
          <input
            v-model="form.email"
            type="email"
            name="email"
            required
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label class="block mb-1 font-medium text-gray-700"
            >Country/Region</label
          >
          <select
            v-model="form.country"
            required
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
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
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="123 Main Street"
          />
        </div>

        <div>
          <label class="block mb-1 font-medium text-gray-700"
            >Apartment, suite, etc. (optional)</label
          >
          <input
            v-model="form.apartment"
            type="text"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Apt 4B"
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block mb-1 font-medium text-gray-700">City</label>
            <input
              v-model="form.city"
              type="text"
              required
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 uppercase"
              placeholder="Lagos"
            />
          </div>
          <div>
            <label class="block mb-1 font-medium text-gray-700">State</label>
            <select
              v-model="form.state"
              required
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
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
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="+234 123 456 7890"
          />
        </div>

        <div class="flex items-center gap-2">
          <input
            v-model="form.sameBilling"
            type="checkbox"
            id="sameBilling"
            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label for="sameBilling" class="text-sm text-gray-700"
            >Use same address for billing</label
          >
        </div>
        <button
          type="submit"
          class="w-full bg-[#10203f] text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-semibold"
        >
          Pay Now
        </button>
      </form>

      <!-- Order Summary -->
      <div
        class="border border-gray-300 p-6 w-full h-auto rounded space-y-4 bg-white shadow-sm"
      >
        <h2 class="text-xl font-semibold">Order summary</h2>

        <div v-for="(item, index) in cartItems" :key="index" class="flex gap-4">
          <img
            :src="
              item.product.image ||
              'https://via.placeholder.com/50x70.png?text=Item'
            "
            :alt="item.product.name"
            class="w-14 h-20 object-cover"
          />
          <div class="flex-1">
            <p class="font-medium">{{ item.product.name }}</p>
            <p class="text-sm text-gray-500">
              Qty: {{ item.quantity }} &times; ₦{{
                item.product.price.toLocaleString()
              }}
            </p>
            <p class="text-sm capitalize">
              Color: {{ item.product.color || "N/A" }}
            </p>
            <p class="text-sm capitalize">
              Size: {{ item.product.size || "N/A" }}
            </p>
          </div>
          <p class="font-semibold">
            ₦{{ (item.product.price * item.quantity).toLocaleString() }}
          </p>
        </div>

        <div class="border-t pt-4 text-sm">
          <div class="flex justify-between">
            <span>Subtotal</span>
            <span class="font-medium">₦{{ cartTotal.toLocaleString() }}</span>
          </div>
          <div class="flex justify-between">
            <span>Delivery</span>
            <span class="text-green-600 font-semibold">Free</span>
          </div>
          <div
            class="flex justify-between mt-4 text-lg font-bold border-t pt-4"
          >
            <span>Total</span>
            <span>₦{{ cartTotal.toLocaleString() }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, computed, onMounted } from "vue";
import { useCartStore } from "../store/cartStore";

const cartStore = useCartStore();
const cartItems = computed(() => cartStore.cartItems);
const cartTotal = computed(() => cartStore.cartTotal);

const form = reactive({
  country: "Nigeria",
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  apartment: "",
  city: "",
  state: "Lagos",
  phone: "",
  sameBilling: false,
});

// Dynamically load Paystack script if not already loaded
onMounted(() => {
  if (!window.PaystackPop) {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
  }
});

const payWithPaystack = () => {
  if (!form.email || !form.firstName || !form.lastName) {
    alert("Please fill all required fields.");
    return;
  }

  if (!window.PaystackPop) {
    alert("Payment gateway is still loading. Please try again in a moment.");
    return;
  }

  const handler = window.PaystackPop.setup({
    key: "pk_test_e92a697f3134cac79f13fd5dd9009c10f7db82ca",
    email: form.email,
    amount: cartTotal.value * 100, // in kobo
    currency: "NGN",
    ref: `ref-${Date.now()}`,
    metadata: {
      custom_fields: [
        {
          display_name: `${form.firstName} ${form.lastName}`,
          variable_name: "shipping_address",
          value: `${form.address}, ${form.city}, ${form.state}`,
        },
      ],
    },
    callback: function (response) {
      alert(`✅ Payment complete! Reference: ${response.reference}`);
    },
    onClose: function () {
      alert("❌ Payment was cancelled.");
    },
  });

  handler.openIframe();
};
</script>
