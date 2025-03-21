// stores/productStore.js
import { defineStore } from "pinia";
import {
  fetchProduct,
  singleProduct,
  filterProducts,
} from "../services/auth.service";

export const useProductStore = defineStore("products", {
  state: () => ({
    products: [],
    selectedProduct: null,
    loading: false,
    error: null,
    currentPage: 1,
    perPage: 10,
    totalProducts: 0,
    // filter product
    filteredProducts: [],
    // Filter parameters
    nameFilter: "",
    modelFilter: "",
    selectedCategory: "",
    minPrice: null,
    maxPrice: null,
    selectedColors: [],
    colors: [],
  }),

  getters: {
    hasProducts: (state) => state.products.length > 0,
    isLoading: (state) => state.loading,
  },

  actions: {
    async fetchProducts(page = 1, perPage = 10) {
      this.loading = true;
      this.error = null;

      try {
        const response = await fetchProduct(page, perPage);
        console.log("Full API Response:", response);
        this.products = response.data?.products || [];
        this.totalProducts = response.data?.total || 0;
        this.currentPage = page;
        this.perPage = perPage;
      } catch (err) {
        this.error = err.message || "Failed to fetch products";
        console.error("Fetch products error:", err);
      } finally {
        this.loading = false;
      }
    },

    //single product
    async fetchProductById(productId) {
      this.loading = true;
      this.error = null;
      try {
        const response = await singleProduct(productId);
        if (response.data) {
          this.selectedProduct = response.data.product;
        } else {
          this.selectedProduct = response;
        }
      } catch (err) {
        this.error = err.message || "Failed to fetch product details";
        console.error("Fetch product by ID error:", err);
        this.selectedProduct = null;
      } finally {
        this.loading = false;
      }
    },

    // filter product
    async applyFilters() {
      this.loading = true;
      this.error = null;

      try {
        const filters = {
          name: this.nameFilter || undefined,
          model: this.modelFilter || undefined,
          min_price: this.minPrice !== null ? this.minPrice : undefined,
          max_price: this.maxPrice !== null ? this.maxPrice : undefined,
          colors:
            this.selectedColors.length > 0 ? this.selectedColors : undefined,
        };

        const response = await filterProducts(filters);
        console.log("Filtered Products Response:", response);
        this.filteredProducts = response.data?.products || [];
      } catch (err) {
        this.error = err.message || "Failed to filter products";
        console.error("Filter products error:", err);
        this.filteredProducts = [];
      } finally {
        this.loading = false;
      }
    },
  },
});
