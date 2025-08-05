import { axiosGet, axiosPost } from "./authRequest.service";

// Get all products with filters and pagination
export const getProducts = async (page, perPage, filters = {}) => {
  const params = new URLSearchParams();

  if (filters.category_id) params.append("category_id", filters.category_id);
  if (filters.color) params.append("color", filters.color);
  if (filters.min_price !== null) params.append("min_price", filters.min_price);
  if (filters.max_price !== null) params.append("max_price", filters.max_price);
  if (filters.model) params.append("model", filters.model);
  if (filters.name) params.append("name", filters.name);
  if (filters.sort_by) params.append("sort_by", filters.sort_by);
  if (filters.sort_order) params.append("sort_order", filters.sort_order);

  params.append("page", page);
  params.append("per_page", perPage);

  const url = `/api/v1/products/get_all_products?${params.toString()}`;
  return await axiosGet(url);
};

// Single product
export const singleProduct = async (productId) => {
  return await axiosGet(`/api/v1/products/single_product/${productId}`);
};

// Related products
export const relatedProducts = async (productId) => {
  return await axiosGet(`/api/v1/products/related_products/${productId}`);
};

export const filterProducts = async (data) => {
  return await axiosPost("/auth/filter-products", data);
};

export const trendingProducts = async (data) => {
  return await axiosGet("/api/v1/products/get_trending", data);
};

export const searchProduct = async (data) => {
  return await axiosGet(`/api/v1/products/search?query=${data.query}`);
};

export const favorite = async (data) => {
  return await axiosPost("/api/v1/products/favorite", data);
};

export const allfavourites = async (data) => {
  return await axiosGet("/api/v1/products/get_favorites", data);
};

export const getCategories = async (data) => {
  return await axiosGet("/api/v1/products/all_categories", data);
};

export const finalCart = async (data) => {
  return await axiosPost("/api/v1/products/finalize_cart", data);
};

export const getfinalCart = async (id) => {
  return await axiosGet(`/api/v1/products/get_finalized_carts/${id}`);
};

export const getAddress = async (data) => {
  return await axiosGet("/api/v1/products/order_address", data);
};

export const verifyPayment = async (data) => {
  return await axiosPost("/api/v1/products/verify_payment", data);
};

export const allOrders = async (data) => {
  return await axiosGet("/api/v1/products/orders", data);
};
