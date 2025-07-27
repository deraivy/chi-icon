<template>
  <div
    class="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-auto overflow-hidden"
  >
    <div
      class="relative w-full h-48 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg animate-pulse"
    >
      <div
        class="absolute inset-0 bg-gradient-to-t from-transparent to-white/20"
      ></div>
      <h2 class="absolute top-4 left-4 text-2xl font-semibold text-gray-800/50">
        chiicon
      </h2>
    </div>
    <div
      class="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md mt-4 w-5/6 animate-pulse"
    ></div>
    <div
      class="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md mt-3 w-3/5 animate-pulse"
    ></div>
    <div
      class="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mt-4 w-32 animate-pulse transition-all duration-300"
    ></div>
  </div>
</template>

<script>
export default {
  name: "SkLoader",
};
</script>

<style scoped>
/* Custom pulse animation with a smoother effect */
@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
