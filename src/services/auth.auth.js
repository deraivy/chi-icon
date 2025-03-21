import { axiosGet, axiosPost } from "./authRequest.service";

// User Registeration
export const signup = async (data) => {
  return await axiosPost("/auth/register_user", data);
};

// User Login

export const signin = async (data) => {
  return await axiosPost("/auth/login", data);
};

// Request Reset Password
export const resetRequest = async (data) => {
  return await axiosPost("/auth/request_reset_password", data);
};

// Password Reset
export const resetPassword = async (data) => {
  return await axiosPost("/auth/reset_password", data);
};

// Verify Email
export const verifyemail = async (data) => {
  return await axiosGet(
    "/auth/verify/ImtpbmdzbGV5ZGlrZTMxOEBnbWFpbC5jb20i.Z9F18Q.kwPuZlDzS8NVV7xFHKs3QifmXr0",
    data
  );
};

//Resend Email verification
export const resendemailverification = async (data) => {
  return await axiosPost("/auth/resend-verification", data);
};
