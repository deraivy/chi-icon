<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center px-4">
    <div class="text-center max-w-lg">
      <img
        src="/images/errorr.svg"
        alt="404 Error Illustration"
        class="w-full max-w-md h-auto mx-auto mb-8 animate-bounce-slow"
        onerror="this.src='/images/fallback-error.png'"
      />

      <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        Oops! Page Not Found
      </h1>
      <p class="text-lg md:text-xl text-gray-600 mb-8">
        It looks like you're lost in space. Let's get you back home!
      </p>

      <router-link
        to="/"
        class="inline-block px-8 py-3 font-semibold text-lg rounded-full bg-[#10203f] hover:bg-[#ff8c4b] text-white transition duration-300 ease-in-out transform hover:scale-105"
      >
        Go Home
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFoundView",
};
</script>

<style scoped>
/* Slow bounce animation for the illustration */
@keyframes bounce-slow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-bounce-slow {
  animation: bounce-slow 3s ease-in-out infinite;
}

/* Ensure dark mode compatibility */
.dark .bg-gray-100 {
  background-color: #1f2937;
}

/* Smooth button hover transition */
.router-link-active {
  outline: none;
}
</style>
