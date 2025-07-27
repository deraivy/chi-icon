<template>
  <div>
    <transition name="fade">
      <div v-if="showSplash">
        <SplashScreen />
      </div>
      <div v-else>
        <NavBar />
        <router-view />
        <Footer />
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Footer from "./components/Footer.vue";
import NavBar from "./components/NavBar.vue";
import SplashScreen from "./components/SplashScreen.vue";

export default {
  components: {
    NavBar,
    Footer,
    SplashScreen,
  },
  setup() {
    const showSplash = ref(true);

    onMounted(() => {
      setTimeout(() => {
        showSplash.value = false;
      }, 2500);
    });

    return { showSplash };
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
