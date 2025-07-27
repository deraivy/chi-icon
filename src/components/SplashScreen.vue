<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-[#e6e6e6] text-gray-800 z-50"
  >
    <div class="text-center animate-fade-in-up">
      <h1 class="text-4xl md:text-6xl font-bold tracking-wide text-[#10203f]">
        Chiicon
      </h1>
      <p class="mt-4 text-lg md:text-xl font-medium text-gray-600">
        Gadgets • Toys • Kids Bedding
      </p>
      <div class="mt-6 flex justify-center">
        <div
          class="w-8 h-8 border-4 border-dashed border-[#10203f] rounded-full animate-spin"
        ></div>
      </div>
    </div>
  </div>
</template>

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
