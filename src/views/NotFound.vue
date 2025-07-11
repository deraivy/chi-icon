<template>
  <div class="bg-gradient-to-r from-slate-200 to-gray-200 text-black">
    <div class="flex items-center justify-center h-[90vh] px-2">
      <div class="text-center">
        <h1 class="text-9xl font-bold">404</h1>
        <p class="text-2xl font-medium mt-4">Oops! Page not found</p>
        <p class="mt-4 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <router-link
          to="/NotFound"
          class="px-6 py-3 bg-white font-bold font-semibold rounded-full hover:bg-red-400 hover:text-white transition duration-300 ease-in-out"
        >
          Go Home
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFoundView",
};
</script>

<style lang="scss" scoped></style>
