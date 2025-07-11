import { defineStore } from "pinia";
import {
  getProducts,
  singleProduct,
  relatedProducts,
  getCategories,
} from "../services/auth.service";

export const useProductStore = defineStore("products", {
  state: () => ({
    products: [],
    relatedProducts: [],
    selectedProduct: null,
    loading: false,
    error: null,
    currentPage: 1,
    perPage: 20,
    totalProducts: 0,
    categories: [],
    colors: [
      "Red",
      "Green",
      "Blue",
      "Black",
      "White",
      "Yellow",
      "Purple",
      "Pink",
    ],
    selectedCategory: "",
    selectedColor: "",
    minPrice: 0,
    maxPrice: null,
    model: "",
    name: "",
    sortBy: "created_at",
    sortOrder: "desc",
  }),

  getters: {
    hasProducts: (state) => state.products.length > 0,
    isLoading: (state) => state.loading,
  },

  actions: {
    async fetchProducts({
      page = this.currentPage,
      perPage = this.perPage,
      category = this.selectedCategory,
      color = this.selectedColor,
      minPrice = this.minPrice,
      maxPrice = this.maxPrice,
      model = this.model,
      name = this.name,
      sortBy = this.sortBy,
      sortOrder = this.sortOrder,
    } = {}) {
      this.loading = true;
      this.error = null;

      console.log("Fetching products with filters:", {
        page,
        perPage,
        category,
        color,
        minPrice,
        maxPrice,
        model,
        name,
        sortBy,
        sortOrder,
      });

      try {
        const response = await getProducts(page, perPage, {
          category_id: category,
          color,
          min_price: minPrice,
          max_price: maxPrice,
          model,
          name,
          sort_by: sortBy,
          sort_order: sortOrder,
        });

        if (response?.data?.products) {
          this.products = response.data.products;
          this.totalProducts = response.data.total_items || 0;
          this.currentPage = page;
          this.perPage = perPage;
        } else {
          this.error = "Failed to fetch products";
        }
      } catch (err) {
        this.error = err.message || "Failed to fetch products";
      } finally {
        this.loading = false;
      }
    },

    async fetchProductById(productId) {
      this.loading = true;
      this.error = null;
      try {
        const response = await singleProduct(productId);
        if (response?.data?.status === "success") {
          this.selectedProduct = response.data.product;
        } else {
          this.error = "Product not found";
        }
      } catch (err) {
        this.error = err.message || "Failed to fetch product";
      } finally {
        this.loading = false;
      }
    },

    async fetchRelatedProducts(productId) {
      this.loading = true;
      this.error = null;
      try {
        const response = await relatedProducts(productId);
        if (response?.data?.status === "success") {
          this.relatedProducts = response.data.related_products || [];
        } else {
          this.error = "No related products found";
        }
      } catch (err) {
        this.error = err.message || "Failed to fetch related products";
      } finally {
        this.loading = false;
      }
    },

    async fetchCategories() {
      this.loading = true;
      this.error = null;
      try {
        const response = await getCategories();
        if (response?.status === 200) {
          this.categories = response.data.categories || [];
        } else {
          this.error = "Failed to fetch categories";
        }
      } catch (err) {
        this.error = err.message || "Failed to fetch categories";
      } finally {
        this.loading = false;
      }
    },

    updateFilters({
      category,
      color,
      minPrice,
      maxPrice,
      model,
      name,
      sortBy,
      sortOrder,
    } = {}) {
      this.selectedCategory = category ?? this.selectedCategory;
      this.selectedColor = color ?? this.selectedColor;
      this.minPrice = minPrice ?? this.minPrice;
      this.maxPrice = maxPrice ?? this.maxPrice;
      this.model = model ?? this.model;
      this.name = name ?? this.name;
      this.sortBy = sortBy ?? this.sortBy;
      this.sortOrder = sortOrder ?? this.sortOrder;
      this.currentPage = 1;
      this.fetchProducts();
    },

    resetFilters() {
      this.selectedCategory = "";
      this.selectedColor = "";
      this.minPrice = 0;
      this.maxPrice = null;
      this.model = "";
      this.name = "";
      this.sortBy = "created_at";
      this.sortOrder = "desc";
      this.currentPage = 1;
      this.fetchProducts();
    },
  },
});
