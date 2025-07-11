<template>
  <div class="container mx-auto px-4 py-6 sm:py-8 lg:py-12">
    <h2 class="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">My Cart</h2>
    <div v-if="cartItems.length === 0" class="text-center py-8 sm:py-12">
      <p class="text-gray-500 text-sm sm:text-base">Your cart is empty.</p>
    </div>
    <div v-else>
      <div class="flex flex-col lg:flex-row gap-4 sm:gap-6">
        <div class="w-full lg:w-3/4">
          <!-- Desktop Table View -->
          <div
            class="hidden sm:block border border-gray-300 rounded-lg p-4 sm:p-6 mb-4"
          >
            <table class="w-full">
              <thead>
                <tr class="text-babase">
                  <th class="text-left font-semibold pb-2">Product</th>
                  <th class="text-left font-semibold pb-2">Price</th>
                  <th class="text-left font-semibold pb-2">Quantity</th>
                  <th class="text-left font-semibold pb-2">Total</th>
                  <th class="text-left font-semibold pb-2">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in cartItems"
                  :key="item.product.id"
                  class="text-babase"
                >
                  <td class="py-2 sm:py-4">
                    <div class="flex items-center">
                      <img
                        class="h-12 w-12 sm:h-16 sm:w-16 mr-2 sm:mr-4"
                        :src="item.product.image"
                        :alt="`Image of ${item.product.name}`"
                      />
                      <span class="font-semibold">{{ item.product.name }}</span>
                    </div>
                  </td>
                  <td class="py-2 sm:py-4">
                    ₦{{ item.product.price.toFixed(2) }}
                  </td>
                  <td class="py-2 sm:py-4">
                    <div class="flex items-center">
                      <button
                        @click="
                          updateQuantity(item.product.id, item.quantity - 1)
                        "
                        :disabled="item.quantity <= 1"
                        class="border rounded-md py-1 px-2 sm:py-2 sm:px-4 mr-1 sm:mr-2 text-babase"
                      >
                        -
                      </button>
                      <span class="text-center w-6 sm:w-8">{{
                        item.quantity
                      }}</span>
                      <button
                        @click="
                          updateQuantity(item.product.id, item.quantity + 1)
                        "
                        class="border rounded-md py-1 px-2 sm:py-2 sm:px-4 ml-1 sm:ml-2 text-babase"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td class="py-2 sm:py-4">
                    ₦{{ (item.product.price * item.quantity).toFixed(2) }}
                  </td>
                  <td class="py-2 sm:py-4">
                    <span
                      class="text-red-600 cursor-pointer text-babase"
                      @click="removeFromCart(item.product.id)"
                    >
                      Remove
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- Mobile Card View -->
          <div class="sm:hidden space-y-4">
            <div
              v-for="item in cartItems"
              :key="item.product.id"
              class="border border-gray-300 rounded-lg p-4"
            >
              <div class="flex items-center mb-2">
                <img
                  class="h-12 w-12 mr-3"
                  :src="item.product.image"
                  :alt="`Image of ${item.product.name}`"
                />
                <div>
                  <h3 class="font-semibold text-sm">{{ item.product.name }}</h3>
                  <p class="text-base text-gray-600">
                    ₦{{ item.product.price.toFixed(2) }}
                  </p>
                </div>
              </div>
              <div class="flex justify-between items-center">
                <div class="flex items-center">
                  <button
                    @click="updateQuantity(item.product.id, item.quantity - 1)"
                    :disabled="item.quantity <= 1"
                    class="border rounded-md py-1 px-2 mr-1 text-base"
                  >
                    -
                  </button>
                  <span class="text-center w-6 text-base">{{
                    item.quantity
                  }}</span>
                  <button
                    @click="updateQuantity(item.product.id, item.quantity + 1)"
                    class="border rounded-md py-1 px-2 ml-1 text-xs"
                  >
                    +
                  </button>
                </div>
                <div class="flex flex-col items-end">
                  <p class="text-xs font-semibold">
                    Total: ₦{{
                      (item.product.price * item.quantity).toFixed(2)
                    }}
                  </p>
                  <span
                    class="text-red-600 cursor-pointer text-xs mt-1"
                    @click="removeFromCart(item.product.id)"
                  >
                    Remove
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full lg:w-1/4">
          <div
            class="border border-gray-300 rounded-lg p-4 sm:p-6 mt-4 lg:mt-0"
          >
            <h2 class="text-base sm:text-lg font-semibold mb-4">Summary</h2>
            <div class="flex justify-between mb-2 text-base">
              <span>Subtotal</span>
              <span>₦{{ cartTotal.toFixed(2) }}</span>
            </div>
            <hr class="my-2" />
            <div class="flex justify-between mb-2 text-base">
              <span class="font-semibold">Total</span>
              <span class="font-semibold">₦{{ cartTotal.toFixed(2) }}</span>
            </div>
            <button
              class="bg-[#10203f] text-white py-2 px-4 rounded-lg mt-4 w-full text-sm sm:text-base"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useCartStore } from "@/store/cartStore";

const cartStore = useCartStore();
const { cartItems, cartTotal } = storeToRefs(cartStore);

const updateQuantity = (productId, quantity) => {
  if (quantity >= 1) {
    cartStore.updateQuantity(productId, quantity);
  }
};

const removeFromCart = (productId) => {
  cartStore.removeFromCart(productId);
};
</script>
