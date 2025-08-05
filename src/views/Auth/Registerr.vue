<template>
  <div class="flex items-center justify-center h-auto bg-gray-50 px-4">
    <div
      class="max-w-5xl w-full bg-white my-16 rounded-lg shadow-lg overflow-hidden"
    >
      <div class="flex flex-col lg:flex-row">
        <!-- Left Image Section -->
        <div
          class="hidden lg:block w-5/12 bg-cover bg-center"
          style="
            background-image: url('https://pagedone.io/asset/uploads/1688031357.jpg');
          "
        ></div>

        <!-- Right Form Section -->
        <div v-if="formData" class="w-full lg:w-7/12 p-8">
          <h3 class="text-3xl font-semibold text-gray-800 text-center mb-8">
            Create an Account
          </h3>

          <form @submit.prevent="registerUser" class="space-y-5">
            <!-- Name Fields -->
            <div class="flex flex-col md:flex-row gap-4">
              <div class="flex-1">
                <label class="text-sm font-medium text-gray-700"
                  >First Name</label
                >
                <input
                  v-model="formData.first_name"
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-[#10203f] focus:border-[#10203f]"
                  :class="{ 'border-[#10203f]': errors.first_name }"
                  @blur="validateField('first_name')"
                />
                <p v-if="errors.first_name" class="text-red-500 text-xs mt-1">
                  {{ errors.first_name }}
                </p>
              </div>
              <div class="flex-1">
                <label class="text-sm font-medium text-gray-700"
                  >Last Name</label
                >
                <input
                  v-model="formData.last_name"
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-[#10203f] focus:border-[#10203f]"
                  :class="{ 'border-[#10203f]': errors.last_name }"
                  @blur="validateField('last_name')"
                />
                <p v-if="errors.last_name" class="text-red-500 text-xs mt-1">
                  {{ errors.last_name }}
                </p>
              </div>
            </div>

            <div class="flex flex-col md:flex-row gap-4">
              <div class="flex-1">
                <label class="text-sm font-medium text-gray-700"
                  >Username</label
                >
                <input
                  v-model="formData.username"
                  type="text"
                  name="username"
                  placeholder="Username"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-[#10203f] focus:border-[#10203f]"
                  :class="{ 'border-[#10203f]': errors.username }"
                  @blur="validateField('username')"
                />
                <p v-if="errors.username" class="text-red-500 text-xs mt-1">
                  {{ errors.username }}
                </p>
              </div>
              <div class="flex-1">
                <label class="text-sm font-medium text-gray-700"
                  >Phone Number</label
                >
                <input
                  v-model="formData.phone_number"
                  type="text"
                  name="phone_number"
                  placeholder="Phone Number"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-[#10203f] focus:border-[#10203f]"
                  :class="{ 'border-[#10203f]': errors.phone_number }"
                  @blur="validateField('phone_number')"
                />
                <p v-if="errors.phone_number" class="text-red-500 text-xs mt-1">
                  {{ errors.phone_number }}
                </p>
              </div>
            </div>

            <!-- Email Field -->
            <div>
              <label class="text-sm font-medium text-gray-700">Email</label>
              <input
                v-model="formData.email"
                type="email"
                name="email"
                placeholder="Enter your email"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-[#10203f] focus:border-[#10203f]"
                :class="{ 'border-[#10203f]': errors.email }"
                @blur="validateField('email')"
              />
              <p v-if="errors.email" class="text-red-500 text-xs mt-1">
                {{ errors.email }}
              </p>
            </div>

            <!-- Password Fields -->
            <div class="flex flex-col md:flex-row gap-4">
              <div class="flex-1">
                <label class="text-sm font-medium text-gray-700"
                  >Password</label
                >
                <input
                  v-model="formData.password"
                  type="password"
                  placeholder="••••••••"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-[#10203f] focus:border-[#10203f]"
                  :class="{ 'border-[#10203f]': errors.password }"
                  @blur="validateField('password')"
                />
                <p v-if="errors.password" class="text-red-500 text-xs mt-1">
                  {{ errors.password }}
                </p>
              </div>
              <div class="flex-1">
                <label class="text-sm font-medium text-gray-700"
                  >Confirm Password</label
                >
                <input
                  v-model="formData.confirm_password"
                  type="password"
                  placeholder="••••••••"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-[#10203f] focus:border-[#10203f]"
                  :class="{ 'border-[#10203f]': errors.confirm_password }"
                  @blur="validateField('confirm_password')"
                />
                <p
                  v-if="errors.confirm_password"
                  class="text-red-500 text-xs mt-1"
                >
                  {{ errors.confirm_password }}
                </p>
              </div>
            </div>

            <!-- Register Button with Loader -->
            <button
              class="w-full mt-2 py-3 bg-[#10203f] text-white font-medium rounded-lg hover:bg-[#1e3a8a] transition duration-300 flex items-center justify-center"
              type="submit"
              :disabled="isLoading"
            >
              <span v-if="!isLoading">Register</span>
              <span v-else class="flex items-center">
                <ButtonLoader />
              </span>
            </button>

            <div class="text-center">
              <router-link
                to="/login"
                class="text-sm text-gray-700 hover:underline hover:font-semibold hover:text-[#1e3a8a] transition-colors duration-300"
              >
                Already have an account? Login!
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, computed } from "vue";
import { signup } from "@/services/auth.auth";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import ButtonLoader from "@/components/ButtonLoader.vue";

export default {
  name: "RegisterView",
  components: {
    ButtonLoader,
  },
  setup() {
    const formData = reactive({
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      phone_number: "",
      password: "",
      confirm_password: "",
    });
    const isLoading = ref(false);
    const toast = useToast();
    const router = useRouter();
    const errors = reactive({
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      phone_number: "",
      password: "",
      confirm_password: "",
    });

    // Validation rules
    const validateField = (field) => {
      switch (field) {
        case "first_name":
          errors.first_name = formData.first_name.trim()
            ? ""
            : "First name is required";
          break;
        case "last_name":
          errors.last_name = formData.last_name.trim()
            ? ""
            : "Last name is required";
          break;
        case "username":
          errors.username = formData.username.trim()
            ? ""
            : "Username is required";
          break;
        case "email": {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          errors.email = formData.email.trim()
            ? emailRegex.test(formData.email)
              ? ""
              : "Invalid email format"
            : "Email is required";
          break;
        }
        case "phone_number": {
          const phoneRegex = /^\d{11}$/;
          errors.phone_number = formData.phone_number.trim()
            ? phoneRegex.test(formData.phone_number)
              ? ""
              : "Invalid phone number (11 digits required)"
            : "Phone number is required";
          break;
        }
        case "password":
          errors.password = formData.password
            ? formData.password.length >= 6
              ? ""
              : "Password must be at least 6 characters"
            : "Password is required";
          break;
        case "confirm_password":
          errors.confirm_password = formData.confirm_password
            ? formData.confirm_password === formData.password
              ? ""
              : "Passwords do not match"
            : "Confirm password is required";
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

    const registerUser = async () => {
      // Start loading
      isLoading.value = true;

      // Validate form
      const isValid = validateForm();

      // Check if any fields are empty
      const anyFieldEmpty = Object.values(formData).some(
        (value) => !value.trim()
      );

      if (!isValid) {
        if (anyFieldEmpty) {
          toast.error("Fill all fields");
        } else {
          toast.error("Please fix the errors in the form before submitting");
        }
        isLoading.value = false;
        return;
      }

      try {
        const response = await signup(formData);
        if (!response.error) {
          toast.success(response.data.message || "Registered Successfully");
          router.push({
            name: "verifyemail",
            query: { email: formData.email },
          });
        } else {
          toast.error(response.error.message || "Error: Try again");
        }
      } catch (error) {
        toast.error("An error occurred during registration");
      } finally {
        isLoading.value = false;
      }
    };

    return {
      isLoading,
      registerUser,
      formData,
      errors,
      validateField,
      isFormValid,
    };
  },
};
</script>
