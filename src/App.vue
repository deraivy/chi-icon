<template>
  <NavBar />
  <router-view />
  <Footer />
</template>

<script>
import Footer from "./components/Footer.vue";
import NavBar from "./components/NavBar.vue";
export default {
  components: {
    NavBar,
    Footer,
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
