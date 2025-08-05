<template>
  <div class="h-[90vh] bg-white flex items-center justify-center p-6">
    <div role="main" class="w-full max-w-md">
      <div
        class="mt-7 bg-white rounded-xl shadow-2xl border-2 border-gray-200 transform transition-all duration-300 hover:scale-[1.01] animate-fade-in"
      >
        <div class="p-4 sm:p-7">
          <div class="mt-5">
            <form @submit.prevent="handleSubmit">
              <div class="mb-4">
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-700"
                  >Email:</label
                >
                <input
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#226F54] focus:border-[#226F54] sm:text-sm"
                  :class="{ 'border-red-500': errors.email }"
                  type="email"
                  id="email"
                  v-model="formData.email"
                  @blur="validateField('email')"
                  required
                />
                <p v-if="errors.email" class="text-red-500 text-xs mt-1">
                  {{ errors.email }}
                </p>
              </div>

              <div class="mb-4">
                <label for="otp" class="block text-sm font-medium text-gray-700"
                  >OTP:</label
                >
                <input
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#226F54] focus:border-[#226F54] sm:text-sm"
                  :class="{ 'border-red-500': errors.otp }"
                  type="text"
                  id="otp"
                  v-model="formData.otp"
                  @blur="validateField('otp')"
                  required
                />
                <p v-if="errors.otp" class="text-red-500 text-xs mt-1">
                  {{ errors.otp }}
                </p>
              </div>

              <div class="mb-4 relative">
                <label
                  for="new_password"
                  class="block text-sm font-medium text-gray-700"
                  >New Password:</label
                >
                <div class="relative">
                  <input
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#226F54] focus:border-[#226F54] sm:text-sm pr-10"
                    :class="{ 'border-red-500': errors.new_password }"
                    :type="showPassword ? 'text' : 'password'"
                    id="new_password"
                    v-model="formData.new_password"
                    @blur="validateField('new_password')"
                    required
                  />
                  <button
                    type="button"
                    class="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                    @click="showPassword = !showPassword"
                  >
                    <svg
                      v-if="showPassword"
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      ></path>
                    </svg>
                    <svg
                      v-else
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      ></path>
                    </svg>
                  </button>
                </div>
                <p v-if="errors.new_password" class="text-red-500 text-xs mt-1">
                  {{ errors.new_password }}
                </p>
              </div>

              <button
                type="submit"
                :disabled="isLoading || !isFormValid"
                class="w-full bg-[#10203f] hover:bg-[#1e3a8a] text-white py-3 px-4 rounded-lg text-sm font-medium transition-colors duration-300 flex justify-center items-center gap-2 disabled:cursor-not-allowed"
              >
                <span v-if="!isLoading">Reset Password</span>
                <div
                  v-else
                  class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                ></div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed } from "vue";
import { resetPassword } from "@/services/auth.auth";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

export default {
  name: "resetPassword",
  setup() {
    const formData = reactive({
      email: "",
      otp: "",
      new_password: "",
    });

    const router = useRouter();
    const toast = useToast();
    const isLoading = ref(false);
    const showPassword = ref(false);
    const errors = reactive({
      email: "",
      otp: "",
      new_password: "",
    });

    // Validation rules
    const validateField = (field) => {
      switch (field) {
        case "email": {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          errors.email = formData.email.trim()
            ? emailRegex.test(formData.email)
              ? ""
              : "Invalid email format"
            : "Email is required";
          break;
        }
        case "otp":
          errors.otp = formData.otp.trim() ? "" : "OTP is required";
          break;
        case "new_password": {
          const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
          errors.new_password = formData.new_password
            ? formData.new_password.length >= 6
              ? specialCharRegex.test(formData.new_password)
                ? ""
                : "Password must include at least one special character (e.g., !@#$%^&*)"
              : "Password must be at least 6 characters"
            : "New password is required";
          break;
        }
      }
    };

    // Validate entire form
    const validateForm = () => {
      Object.keys(formData).forEach((field) => validateField(field));
      return Object.values(errors).every((error) => error === "");
    };

    // Computed property to check if form is valid
    const isFormValid = computed(() => {
      return (
        Object.values(errors).every((error) => error === "") &&
        Object.values(formData).every((value) => value.trim() !== "")
      );
    });

    const handleSubmit = async () => {
      // Validate form before submission
      const isValid = validateForm();

      if (!isValid) {
        toast.error("Please fix the errors in the form before submitting");
        return;
      }

      isLoading.value = true;

      try {
        const response = await resetPassword(formData);
        if (!response.error) {
          toast.success(response.data.message || "Password reset successfully");
          router.push("/login");
        } else {
          toast.error(response.error.message || "Error: Try again.");
        }
      } catch (error) {
        toast.error("An unexpected error occurred.");
      } finally {
        isLoading.value = false;
      }
    };

    return {
      formData,
      isLoading,
      showPassword,
      errors,
      validateField,
      isFormValid,
      handleSubmit,
    };
  },
};
</script>
