import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartItems: JSON.parse(sessionStorage.getItem("cartItems")) || [],
  }),

  getters: {
    cartCount: (state) => {
      const count = state.cartItems.reduce(
        (total, item) => total + (item.quantity || 0),
        0
      );
      console.log("Cart count:", count, "Cart items:", state.cartItems);
      return count;
    },
    cartTotal: (state) =>
      state.cartItems.reduce(
        (total, item) =>
          total + (item.product?.price || 0) * (item.quantity || 0),
        0
      ),
  },

  actions: {
    addToCart(product, quantity = 1) {
      if (!product || !product.id) {
        console.error("Invalid product:", product);
        return;
      }
      const existingItem = this.cartItems.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.cartItems.push({ product, quantity });
      }
      this.saveCart();
      console.log("Cart updated:", this.cartItems);
    },

    removeFromCart(productId) {
      this.cartItems = this.cartItems.filter(
        (item) => item.product.id !== productId
      );
      this.saveCart();
    },

    updateQuantity(productId, quantity) {
      const item = this.cartItems.find((item) => item.product.id === productId);
      if (item && quantity > 0) {
        item.quantity = quantity;
      } else if (item && quantity <= 0) {
        this.removeFromCart(productId);
      }
      this.saveCart();
    },

    saveCart() {
      sessionStorage.setItem("cartItems", JSON.stringify(this.cartItems));
    },

    clearCart() {
      this.cartItems = [];
      this.saveCart();
    },

    fetchCart() {
      this.cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];
      console.log("Fetched cart:", this.cartItems);
    },
  },
});
