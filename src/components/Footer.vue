<template>
  <footer
    class="bg-gray-50 border-t border-gray-200 text-gray-800 py-12 px-4 sm:px-6"
  >
    <divz
      class="max-w-7xl mx-auto grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start"
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
              class="flex items-center text-gray-600 hover:text-red-600 transition-colors duration-300"
              aria-label="View shopping cart"
            >
              Cart
            </router-link>
          </li>
          <li>
            <router-link
              to="/checkout"
              class="flex items-center text-gray-600 hover:text-red-600 transition-colors duration-300"
              aria-label="Proceed to checkout"
            >
              Checkout
            </router-link>
          </li>
          <li>
            <router-link
              to="/account"
              class="flex items-center text-gray-600 hover:text-red-600 transition-colors duration-300"
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
          Get in Touch
        </h4>
        <ul class="space-y-3 text-sm">
          <li class="flex items-center">
            <a
              href="tel:+2348501235021"
              class="text-gray-600 hover:text-red-600 transition-colors duration-300"
              aria-label="Call Chiicon support"
            >
              +234 850-123-5021
            </a>
          </li>
          <li class="flex items-center">
            <a
              href="mailto:info@chiicon.com"
              class="text-gray-600 hover:text-red-600 transition-colors duration-300"
              aria-label="Email Chiicon support"
            >
              info@chiicon.com
            </a>
          </li>
          <li class="flex items-center">
            <a
              href="https://www.google.com/maps/place/4C+Idowu+Martins+St,+Victoria+Island,+Lagos,+Nigeria"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-600 hover:text-red-600 transition-colors duration-300"
              aria-label="View Chiicon location on Google Maps"
            >
              4C Idowu Martins, VI, Lagos
            </a>
          </li>
        </ul>
      </div>

      <!-- Social Handles -->
      <div class="animate-fade-in-up animation-delay-600">
        <h4 class="text-lg font-poppins font-semibold text-gray-900 mb-4">
          Follow Us
        </h4>
        <!-- <div class="flex gap-4">
          <a
            v-for="social in socials"
            :key="social.name"
            :href="social.url"
            :aria-label="`Follow Chiicon on ${social.name}`"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center w-12 h-12 bg-gray-600 rounded-full border border-gray-300 hover:border-red-600 hover:bg-red-600 transition-all duration-300 group"
          >
            <ion-icon
              :name="social.icon"
              class="text-white text-xl group-hover:scale-110 transition-transform duration-300"
              aria-hidden="true"
            ></ion-icon>
          </a>
        </div> -->
      </div>
    </divz>

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
