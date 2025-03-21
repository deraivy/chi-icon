<template>
  <div class="h-[90vh] bg-gray-100 flex items-center justify-center p-4">
    <div class="w-full max-w-sm bg-white shadow-xl rounded-2xl overflow-hidden">
      <!-- Header Section -->
      <div
        class="relative bg-gradient-to-br from-red-500 to-red-400 h-36 flex justify-center items-center"
      >
        <div
          class="absolute -bottom-8 bg-white w-20 h-20 rounded-full flex justify-center items-center shadow-lg border-4 border-white"
        >
          <img src="/icons/email.svg" alt="Email Icon" class="w-10 h-10" />
        </div>
      </div>

      <!-- Content Section -->
      <div class="pt-12 pb-8 px-6 text-center">
        <h2 class="text-2xl font-bold text-gray-800 mb-3">Check Your Email</h2>
        <p class="text-gray-600 text-sm leading-relaxed mb-6">
          We've sent a confirmation email to your inbox. Please follow the link
          to verify your account.
        </p>

        <!-- Verify Button (Disabled since it's just for show) -->
        <div class="flex justify-center items-center mt-6">
          <button
            @click="resendVerification"
            class="px-6 py-2 bg-red-600 text-white font-medium rounded-full shadow-md hover:bg-red-600 transition duration-300 opacity-75"
          >
            Resend Email
          </button>
        </div>

        <!-- Resend Section -->
        <p class="mt-6 text-sm text-gray-500">
          Didn't receive it? Check your spam folder or
          <span
            class="text-red-500 hover:text-red-600 font-medium cursor-pointer underline"
          >
            return to site
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { resendemailverification } from "@/services/auth.auth";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const email = ref(route.query.email || "");
    const toast = useToast();
    const resendVerification = async () => {
      const response = await resendemailverification({ email: email.value });
      if (!response.error) {
        toast.success(response.data.message || "Verification email resent!");
      } else {
        toast.error(
          response.error.message ||
            "Error: Could not resend verification email."
        );
      }
    };

    return {
      email,
      resendVerification,
    };
  },
};
</script>
