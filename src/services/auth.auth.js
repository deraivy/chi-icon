import { axiosPost } from "./authRequest.service";

// User Registeration
export const signup = async (data) => {
  return await axiosPost("/api/v1/auth/register_user", data);
};

// User Login

export const signin = async (data) => {
  return await axiosPost("/api/v1/auth/login", data);
};

// Request Reset Password
export const resetRequest = async (data) => {
  return await axiosPost("/api/v1/auth/request_reset_password", data);
};

//Resend Email verification
export const resendemailverification = async (data) => {
  return await axiosPost("/auth/resend-verification", data);
};
