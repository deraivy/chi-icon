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
                  type="email"
                  id="email"
                  v-model="formData.email"
                  required
                />
              </div>

              <div class="mb-4">
                <label for="otp" class="block text-sm font-medium text-gray-700"
                  >OTP:</label
                >
                <input
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#226F54] focus:border-[#226F54] sm:text-sm"
                  type="text"
                  id="otp"
                  v-model="formData.otp"
                  required
                />
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
                    :type="showPassword ? 'text' : 'password'"
                    id="new_password"
                    v-model="formData.new_password"
                    required
                  />
                  <button
                    type="button"
                    class="absolute inset-y-0 right-3 flex items-center text-gray-500"
                    @click="showPassword = !showPassword"
                  >
                    {{ showPassword ? "👁️" : "🙈" }}
                  </button>
                </div>
              </div>

              <button
                class="w-full py-2 px-4 bg-[#226F54] text-white rounded-md hover:bg-[#3C8B72] focus:ring-2 transition duration-200 flex items-center justify-center"
                type="submit"
                :disabled="isLoading"
              >
                <!-- <span v-if="isLoading" class="animate-spin mr-2">⏳</span> -->
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
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

    const handleSubmit = async () => {
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
      }

      isLoading.value = false;
    };

    return {
      formData,
      isLoading,
      showPassword,
      handleSubmit,
    };
  },
};
</script>
