import { axiosGet, axiosPost } from "./authRequest.service";

export const fetchProduct = async (page, perPage) => {
  return await axiosGet(
    `/auth/get_all_products?page=${page}&per_page=${perPage}`
  );
};

export const singleProduct = async (productId) => {
  return await axiosGet(`/auth/single_product/${productId}`);
};

export const filterProducts = async (data) => {
  return await axiosPost("/auth/filter-products", data);
};

export const searchProduct = async (data) => {
  return await axiosGet(`/auth/search?query=${data.query}`);
};
