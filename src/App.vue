<template>
  <NavBar />
  <router-view />
</template>

<script>
import NavBar from "./components/NavBar.vue";
export default {
  components: {
    NavBar,
  },
};
</script>

<style>
:root {
  --font-sans: "Roboto", sans-serif !important;
}
body {
  font-family: var(--font-sans) !important;
}
</style>
