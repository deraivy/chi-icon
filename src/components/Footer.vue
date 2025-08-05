<template>
  <footer
    class="bg-[#f7f7f7] border-t border-gray-200 text-gray-800 py-12 px-4 sm:px-6"
  >
    <div
      class="w-full md:container px-4 mx-auto grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start"
    >
      <!-- Branding & About -->
      <div class="animate-fade-in-up">
        <img
          src="/images/logo.png"
          alt="Chiicon Logo"
          class="w-42 h-auto -mt-12"
          loading="lazy"
        />
        <p class="-mt-6 text-gray-600 text-sm leading-relaxed max-w-xs">
          Shop with style at Chiicon—your go-to for gadgets, toys, beds, and
          more. Fresh categories, fast finds, chic vibes.
        </p>
      </div>

      <!-- Quick Links -->
      <div class="animate-fade-in-up animation-delay-200">
        <h4 class="text-lg font-poppins font-semibold text-gray-900 mb-4">
          Explore
        </h4>
        <ul class="space-y-3 text-sm">
          <li>
            <router-link
              to="/cart"
              class="flex items-center text-gray-600 hover:text-[#ff8c4b] transition-colors duration-300"
              aria-label="View shopping cart"
            >
              Cart
            </router-link>
          </li>
          <li>
            <router-link
              to="/checkout"
              class="flex items-center text-gray-600 hover:text-[#ff8c4b] transition-colors duration-300"
              aria-label="Proceed to checkout"
            >
              Checkout
            </router-link>
          </li>
          <li>
            <router-link
              to="/account"
              class="flex items-center text-gray-600 hover:text-[#ff8c4b] transition-colors duration-300"
              aria-label="View my account"
            >
              My Account
            </router-link>
          </li>
        </ul>
      </div>

      <!-- Contact Info -->
      <div class="animate-fade-in-up animation-delay-400">
        <h4 class="text-lg font-poppins font-semibold text-gray-900 mb-4">
          Need Help
        </h4>
        <ul class="space-y-3 text-sm">
          <li class="flex items-center cursor-pointer">
            <a
              class="text-gray-600 hover:text-[#ff8c4b] transition-colors duration-300"
              aria-label="Call Chiicon support"
            >
              Privacy Policy
            </a>
          </li>
          <li class="flex items-center cursor-pointer">
            <a
              class="text-gray-600 hover:text-[#ff8c4b] transition-colors duration-300"
              aria-label="Email Chiicon support"
            >
              Terms and Conditions
            </a>
          </li>
          <li class="flex items-center cursor-pointer">
            <a
              href="mailto:info@chiicon.com"
              class="text-gray-600 hover:text-[#ff8c4b] transition-colors duration-300"
              aria-label="Email Chiicon support"
            >
              FAQ
            </a>
          </li>
        </ul>
      </div>

      <!-- Social Handles -->
      <div class="animate-fade-in-up animation-delay-600">
        <h4 class="text-lg font-poppins font-semibold text-gray-900 mb-4">
          Follow Us
        </h4>
        <div class="flex gap-4">
          <div
            class="flex items-center justify-center w-12 h-12 bg-[#10203f] rounded-full shadow-md hover:bg-[#1e3a8a] transition-colors duration-300"
          >
            <AppIcon icon="mdi:instagram" class="w-6 h-6 text-white" />
          </div>
          <div
            class="flex items-center justify-center w-12 h-12 bg-[#10203f] rounded-full shadow-md hover:bg-[#1e3a8a] transition-colors duration-300"
          >
            <AppIcon
              icon="grommet-icons:facebook-option"
              class="w-6 h-6 text-white"
            />
          </div>
          <div
            class="flex items-center justify-center w-12 h-12 bg-[#10203f] rounded-full shadow-md hover:bg-[#1e3a8a] transition-colors duration-300"
          >
            <AppIcon icon="ri:twitter-x-line" class="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </div>

    <!-- Copyright -->
    <div
      class="border-t border-gray-200 mt-10 pt-6 text-center text-gray-600 text-sm animate-fade-in-up animation-delay-800"
    >
      © 2025 Chiicon. All rights reserved.
    </div>
  </footer>
</template>

<!-- <script>
export default {
  name: "FooterComponent",
  setup() {
    const socials = [
      {
        name: "Twitter",
        url: "https://twitter.com/chiicon",
        icon: "logo-twitter",
      },
      {
        name: "Instagram",
        url: "https://instagram.com/chiicon",
        icon: "logo-instagram",
      },
      {
        name: "Facebook",
        url: "https://facebook.com/chiicon",
        icon: "logo-facebook",
      },
    ];

    return { socials };
  },
};
</script> -->

<style scoped>
/* Animations */
@keyframes fadeInUp {
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
  animation: fadeInUp 0.8s ease-out forwards;
}

.animation-delay-200 {
  animation-delay: 0.2s;
}

.animation-delay-400 {
  animation-delay: 0.4s;
}

.animation-delay-600 {
  animation-delay: 0.6s;
}

.animation-delay-800 {
  animation-delay: 0.8s;
}
</style>
