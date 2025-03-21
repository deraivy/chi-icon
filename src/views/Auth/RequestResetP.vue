<template>
  <div
    class="font-sans h-[90vh] bg-gradient-to-l from-gray-200 to-gray-50 flex items-center justify-center p-6"
  >
    <div class="w-full max-w-md">
      <div
        class="mt-7 bg-white rounded-xl shadow-2xl border-gray-800 transform transition-all duration-300 hover:scale-[1.01] animate-fade-in"
      >
        <div class="p-4 sm:p-7">
          <div class="text-center">
            <h1 class="block text-2xl font-bold text-gray-800 mb-2">
              Forgot password?
            </h1>
            <p class="text-sm text-gray-600">
              Remember your password?
              <router-link
                to="/login"
                class="text-gray-800 decoration-2 hover:text-blue-900 hover:underline font-medium transition-colors duration-300"
              >
                Login here
              </router-link>
            </p>
          </div>

          <div class="mt-5">
            <form @submit.prevent="handleRequestReset">
              <div class="grid gap-y-4">
                <div>
                  <label
                    for="email"
                    class="block text-base font-medium ml-1 mb-2 text-gray-700"
                  >
                    Email address
                  </label>
                  <div class="relative">
                    <input
                      v-model="email"
                      type="email"
                      id="email"
                      name="email"
                      class="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-red-800 focus:ring-2 focus:ring-red-800 transition-all duration-300"
                      required
                      aria-describedby="email-error"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-lg border border-transparent font-semibold bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2 transition-all duration-300 hover:scale-[1.02] disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Reset password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { resetRequest } from "@/services/auth.auth";
import { useToast } from "vue-toastification";

export default {
  setup() {
    const email = ref("");
    const router = useRouter();
    const toast = useToast();

    const handleRequestReset = async () => {
      const data = { email: email.value };

      try {
        const response = await resetRequest(data);

        // Check if OTP was sent successfully
        if (response.data) {
          toast.success("OTP sent successfully");
          router.push("/passwordreset");
        }
      } catch (error) {
        console.error("Error sending OTP:", error);
        // Handle error (e.g., show a notification)
      }
    };

    return {
      email,
      handleRequestReset,
    };
  },
};
</script>

<style scoped>
/* Add custom styles here if needed */
</style>
