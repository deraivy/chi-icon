<template>
  <swiper
    :rewind="true"
    :navigation="true"
    :autoplay="{ delay: 3500, disableOnInteraction: false }"
    :modules="modules"
    class="h-[65vh] lg:h-[50vh] md:h-[45vh] sm:h-[40vh] w-full overflow-hidden"
  >
    <!-- Slide 1 -->
    <!-- backslide -->
    <swiper-slide class="bg-gray-700 text-white relative">
      <!-- Background Image for Small Screens -->
      <div
        class="absolute inset-0 bg-none bg-center sm:hidden"
        style="background-image: url('/images/macki.png')"
      >
        <div class="absolute inset-0 bg-black/50"></div>
      </div>

      <div
        class="relative mx-auto w-full max-w-7xl px-4 sm:px-6 py-8 md:px-8 md:py-10 lg:py-12"
      >
        <div
          class="grid grid-cols-1 md:grid-cols-2 items-center gap-8 p-6 md:p-10 w-full max-w-7xl mx-auto"
        >
          <div class="text-center md:text-left space-y-4 animate-fade-in">
            <h2
              class="text-3xl sm:text-4xl md:text-3xl font-extrabold leading-tight"
            >
              Great Deals On All Gadgets
            </h2>

            <button
              class="mt-4 px-6 py-3 bg-white text-pink-700 font-semibold rounded-full shadow-lg hover:bg-pink-100 transition-colors"
            >
              Shop Now
            </button>
          </div>

          <!-- Image only visible on medium+ screens -->
          <img
            src="/images/macki.png"
            alt="Latest MacBook"
            class="w-80 md:w-96 h-auto object-contain mx-auto md:mx-0 hidden sm:block animate-slide-up"
          />
        </div>
      </div>
    </swiper-slide>

    <!-- Slide 2 -->
    <swiper-slide class="bg-gray-700 text-white">
      <div
        class="grid grid-cols-1 md:grid-cols-2 items-center gap-8 p-6 md:p-10 w-full max-w-7xl mx-auto"
      >
        <img
          src="/images/02bg.png"
          alt="Latest MacBook"
          class="w-80 md:w-96 h-auto object-contain mx-auto md:mx-0 animate-slide-up"
        />
        <div class="text-center md:text-left space-y-4 animate-fade-in">
          <h2
            class="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight"
          >
            Stay Ahead with <br class="hidden md:block" />
            Smart Tech
          </h2>
          <p class="text-lg md:text-xl opacity-90">
            Discover innovative technology at affordable prices.
          </p>
          <button
            class="mt-4 px-6 py-3 bg-white text-gray-700 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          >
            Explore More
          </button>
        </div>
      </div>
    </swiper-slide>

    <!-- Slide 3 -->
    <swiper-slide class="bg-gray-600 text-white">
      <div
        class="grid grid-cols-1 md:grid-cols-2 items-center gap-8 p-6 md:p-10 w-full max-w-7xl mx-auto"
      >
        <img
          src="/images/ip.png"
          alt="Smartwatch"
          class="w-full md:w-96 h-auto max-h-[50vh] object-cover mx-auto md:mx-0 animate-slide-up"
        />
        <div class="text-center md:text-left space-y-4 animate-fade-in">
          <h2
            class="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight"
          >
            Shop Now and <br class="hidden md:block" />
            Save Big
          </h2>
          <p class="text-lg md:text-xl opacity-90">
            Limited-time offers on your favorite gadgets!
          </p>
          <button
            class="mt-4 px-6 py-3 bg-white text-gray-600 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          >
            Grab Deals
          </button>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Navigation, Autoplay } from "swiper/modules";

export default {
  name: "HomeView",
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Navigation, Autoplay],
    };
  },
};
</script>

<style scoped>
/* Custom styles for enhanced aesthetics */
.swiper-slide {
  transition: background-color 0.3s ease;
  overflow: hidden;
}

h2 {
  font-family: "Poppins", sans-serif;
  color: #ffffff;
}

p {
  font-family: "Roboto", sans-serif;
  color: #f1f1f1;
}

/* Animation Keyframes */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

.animate-slide-up {
  animation: slideUp 0.8s ease-out forwards;
}
</style>
