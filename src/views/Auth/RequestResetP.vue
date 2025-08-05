<template>
  <div
    class="font-sans min-h-screen bg-gradient-to-l from-gray-200 to-gray-50 flex items-center justify-center p-6"
  >
    <div class="w-full max-w-md">
      <div
        class="mt-7 bg-white rounded-xl shadow-lg border border-gray-200 transform transition-all duration-300 hover:scale-[1.01] animate-fade-in-up"
      >
        <div class="p-6 sm:p-8">
          <div class="text-center">
            <h1 class="text-2xl font-bold text-gray-800 mb-2">
              Forgot Password?
            </h1>
            <p class="text-sm text-gray-600">
              Remember your password?
              <router-link
                to="/login"
                class="text-[#10203f] hover:text-[#1e3a8a] hover:underline font-medium transition-colors duration-300"
              >
                Login here
              </router-link>
            </p>
          </div>

          <div class="mt-6">
            <form @submit.prevent="handleRequestReset">
              <div class="space-y-4">
                <div>
                  <label
                    for="email"
                    class="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <div class="relative">
                    <input
                      v-model="email"
                      type="email"
                      id="email"
                      name="email"
                      class="w-full py-3 px-4 border border-gray-300 rounded-lg text-sm transition-all duration-300"
                      required
                      aria-describedby="email-error"
                      placeholder="Enter your email"
                    />
                    <p
                      v-if="errorMessage"
                      class="mt-1 text-sm text-red-600"
                      id="email-error"
                    >
                      {{ errorMessage }}
                    </p>
                  </div>
                </div>
                <button
                  type="submit"
                  :disabled="isLoading"
                  class="w-full bg-[#10203f] hover:bg-[#1e3a8a] text-white py-3 px-4 rounded-lg text-sm font-medium transition-colors duration-300 flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span v-if="!isLoading">Reset Password</span>
                  <div
                    v-else
                    class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                  ></div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { resetRequest } from "@/services/auth.auth";
import { useToast } from "vue-toastification";

const email = ref("");
const router = useRouter();
const toast = useToast();
const isLoading = ref(false);
const errorMessage = ref("");

const handleRequestReset = async () => {
  if (!email.value) {
    errorMessage.value = "Please enter a valid email address";
    return;
  }

  isLoading.value = true;
  errorMessage.value = "";

  try {
    const response = await resetRequest({ email: email.value });
    if (response.data) {
      toast.success("OTP sent successfully");
      router.push("/passwordreset");
    }
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message || "Failed to send OTP. Please try again.";
    toast.error(errorMessage.value);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out;
}
</style>
