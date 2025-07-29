<template>
  <div class="h-screen flex items-center justify-center py-12 px-6">
    <div
      class="w-full max-w-4xl flex flex-col lg:flex-row shadow-lg rounded-lg overflow-hidden"
    >
      <!-- Left Image Section -->
      <div
        class="hidden lg:block w-5/12 bg-cover"
        style="
          background-image: url('https://pagedone.io/asset/uploads/1688031357.jpg');
        "
      ></div>

      <!-- Login Form Section -->
      <div class="w-full lg:w-7/12 bg-white p-8 flex flex-col justify-center">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
          <!-- Header -->
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold text-[#10203f]">Welcome Back</h2>
            <p class="mt-2 text-gray-600">Please sign in to your account</p>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleLogin" class="space-y-6">
            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-gray-700" for="email"
                >Email Address</label
              >
              <input
                v-model="formData.email"
                type="email"
                id="email"
                placeholder="Enter your email"
                class="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-red-500"
                :class="{ 'border-red-500': errors.email }"
                @blur="validateField('email')"
              />
              <p v-if="errors.email" class="text-red-500 text-sm mt-1">
                {{ errors.email }}
              </p>
            </div>

            <!-- Password -->
            <div>
              <label
                class="block text-sm font-medium text-gray-700"
                for="password"
                >Password</label
              >
              <div class="mt-1 relative">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  v-model="formData.password"
                  id="password"
                  placeholder="••••••••"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-red-500"
                  :class="{ 'border-red-500': errors.password }"
                  @blur="validateField('password')"
                />
                <button
                  type="button"
                  @click="togglePassword"
                  class="absolute inset-y-0 right-3 flex items-center"
                >
                  <svg
                    v-if="showPassword"
                    class="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <svg
                    v-else
                    class="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                </button>
              </div>
              <p v-if="errors.password" class="text-red-500 text-sm mt-1">
                {{ errors.password }}
              </p>
            </div>

            <!-- Remember Me & Forgot Password -->
            <div
              class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0"
            >
              <div class="flex items-center">
                <label for="remember" class="ml-2 text-sm text-gray-600"
                  >Remember me</label
                >
              </div>
              <router-link
                to="/request-reset"
                class="text-sm text-[#10203f] hover:text-red-700"
                >Forgot password?</router-link
              >
            </div>

            <!-- Sign In Button -->
            <button
              type="submit"
              :disabled="isLoading || !isFormValid"
              class="w-full flex justify-center py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-[#10203f] hover:bg-[#ff8c4b] disabled:cursor-not-allowed"
            >
              <span v-if="!isLoading">Sign In</span>
              <span v-else class="flex items-center">
                <ButtonLoader />
              </span>
            </button>
          </form>

          <!-- Sign Up Redirect -->
          <p class="mt-6 text-center text-sm">
            Don't have an account?
            <router-link
              to="/register"
              class="font-medium text-[#10203f] hover:font-semibold hover:text-[#ff8c4b]"
              >Sign up now</router-link
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, computed } from "vue";
import { session } from "@/utils";
import { useToast } from "vue-toastification";
import { signin } from "@/services/auth.auth";
import { useRouter } from "vue-router";
import ButtonLoader from "@/components/ButtonLoader.vue";

export default {
  name: "LoginView",
  components: {
    ButtonLoader,
  },
  setup() {
    const formData = reactive({
      email: "",
      password: "",
    });

    const errors = reactive({
      email: "",
      password: "",
    });

    const showPassword = ref(false);
    const isLoading = ref(false);
    const toast = useToast();
    const router = useRouter();

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
        case "password":
          errors.password = formData.password
            ? formData.password.length >= 6
              ? ""
              : "Password must be at least 6 characters"
            : "Password is required";
          break;
      }
    };

    const validateForm = () => {
      Object.keys(formData).forEach((field) => validateField(field));
      return Object.values(errors).every((error) => error === "");
    };

    const isFormValid = computed(() => {
      return (
        Object.values(errors).every((error) => error === "") &&
        Object.values(formData).every((value) => value.trim() !== "")
      );
    });

    const togglePassword = () => {
      showPassword.value = !showPassword.value;
    };

    const handleLogin = async () => {
      isLoading.value = true;

      const isValid = validateForm();
      const anyFieldEmpty = Object.values(formData).some(
        (value) => !value.trim()
      );

      if (!isValid) {
        if (anyFieldEmpty) {
          toast.error("Please fill all fields");
        } else {
          toast.error("Please fix the errors in the form before submitting");
        }
        isLoading.value = false;
        return;
      }

      try {
        console.log("Sending login request with:", formData);
        const response = await signin(formData);
        console.log("Login raw response:", response);

        if (response && !response.error) {
          toast.success(response.data.message || "Login Successful");
          session.set("sessionData", response.data);
          router.push("/").then(() => {
            window.location.reload();
          });
        } else {
          toast.error(response.error?.message || "Invalid email or password");
          isLoading.value = false; // 🔴 Important: stop loader on failed login
        }
      } catch (error) {
        console.error("Login catch error:", {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        });
        toast.error(error.response?.data?.message || "Login failed");
        isLoading.value = false; // 🔴 Important: stop loader on exception
      }
    };

    return {
      formData,
      errors,
      showPassword,
      isLoading,
      togglePassword,
      handleLogin,
      validateField,
      isFormValid,
    };
  },
};
</script>
