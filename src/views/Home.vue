<template>
  <div class="bg-[]">
    <section>
      <swiper
        :navigation="{
          nextEl: '.custom-next',
          prevEl: '.custom-prev',
        }"
        :parallax="true"
        :loop="true"
        :autoplay="{
          delay: 3000,
          disableOnInteraction: false,
        }"
        :modules="modules"
        class="w-full h-[90vh]"
      >
        <!-- slide 1 -->
        <swiper-slide class="relative">
          <img
            src="/images/headset.jpg"
            alt="gadgets"
            class="w-full h-full object-cover"
          />
          <div
            class="absolute inset-0 flex items-center justify-center text-center bg-black/30"
          >
            <div class="text-white w-full md:container px-4 mx-auto">
              <h2
                class="text-3xl md:text-5xl lg:text-7xl leading-[1.2] font-bold mx-auto max-w-4xl"
              >
                Where innovation meets lifestyle
              </h2>
              <p class="mt-6 text-lg md:text-xl">
                Explore cutting-edge tech for work, home, and play
              </p>

              <router-link
                to="/products"
                class="mt-6 inline-block bg-[#EB5E28] px-4 py-2.5 rounded-md cursor-pointer hover:bg-[#c94f21] transition"
              >
                Shop now
              </router-link>
            </div>
          </div>
        </swiper-slide>
        <!-- slide 2 -->
        <swiper-slide class="relative">
          <img
            src="/images/kids2.jpg"
            alt="Kids Image 1"
            class="w-full h-full object-cover"
          />
          <div
            class="absolute inset-0 flex items-center justify-center text-center bg-black/30"
          >
            <div class="text-white w-full md:container px-4 mx-auto">
              <h2
                class="text-3xl md:text-5xl lg:text-7xl leading-[1.2] font-bold mx-auto max-w-4xl"
              >
                Turn your child's space into a dreamy, magical realm
              </h2>
              <p class="mt-6 text-lg md:text-xl">Discover fun and learning!</p>

              <router-link
                to="/products"
                class="mt-6 inline-block bg-[#EB5E28] px-4 py-2.5 rounded-md cursor-pointer hover:bg-[#c94f21] transition"
              >
                Shop now
              </router-link>
            </div>
          </div>
        </swiper-slide>
        <!-- slide 3 -->
        <swiper-slide class="relative">
          <img
            src="/images/toyxx.jpg"
            alt="Kids Image 1"
            class="w-full h-full object-cover"
          />
          <div
            class="absolute inset-0 flex items-center justify-center text-center bg-black/30"
          >
            <div class="text-white w-full md:container px-4 mx-auto">
              <h2
                class="text-3xl md:text-5xl lg:text-7xl leading-[1.2] font-bold mx-auto max-w-4xl"
              >
                Toys that spark joy and creativity!
              </h2>
              <p class="mt-6 text-lg md:text-xl">Discover fun and learning!</p>
              <router-link
                to="/products"
                class="mt-6 inline-block bg-[#EB5E28] px-4 py-2.5 rounded-md cursor-pointer hover:bg-[#c94f21] transition"
              >
                Shop now
              </router-link>
            </div>
          </div>
        </swiper-slide>
        <div class="hidden md:block">
          <div
            class="custom-prev absolute top-1/2 left-4 -translate-y-1/2 z-20"
          >
            <button
              class="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:bg-[#EB5E28] hover:text-white transition"
            >
              <AppIcon icon="ic:round-arrow-back" class="w-6 h-6" />
            </button>
          </div>

          <div
            class="custom-next absolute top-1/2 right-4 -translate-y-1/2 z-20"
          >
            <button
              class="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:bg-[#EB5E28] hover:text-white transition"
            >
              <AppIcon icon="ic:round-arrow-forward" class="w-6 h-6" />
            </button>
          </div>
        </div>
      </swiper>
    </section>

    <section class="w-full md:container mx-auto px-4">
      <!-- Shop Categories -->
      <div class="my-12">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center">
          Shop by Categories
        </h2>
        <div v-if="isLoading" class="">
          <Loader />
        </div>
        <div
          v-else-if="categories.length === 0"
          class="text-center text-gray-500"
        >
          No categories available.
        </div>
        <div
          v-else
          class="flex flex-col md:flex-row justify-center items-center gap-6"
        >
          <router-link
            v-for="category in categories.slice(0, 3)"
            :key="category.id"
            :to="`/products/categories/${category.id}`"
            class="group relative bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300"
            :aria-label="`View ${category.name} category`"
          >
            <div class="relative">
              <img
                :src="category.image || '/images/11873.jpg'"
                :alt="`Image of ${category.name} category`"
                class="w-full rounded-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div
                class="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 to-transparent"
              ></div>
              <h3
                class="absolute bottom-4 left-0 right-0 text-center text-white text-lg font-semibold"
              >
                {{ category.name }}
              </h3>
            </div>
          </router-link>
        </div>
      </div>

      <!-- Trending Products -->
      <div class="my-12">
        <div class="">
          <div class="flex justify-between items-center mb-8">
            <h2
              class="text-3xl md:text-4xl lg:text-5xl mx-auto font-bold text-center tracking-tight"
            >
              Trending Products
            </h2>
          </div>

          <div
            v-if="isLoading"
            class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            <SkLoader v-for="i in 8" :key="i" />
          </div>

          <div
            v-else
            class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          >
            <ProductCard
              v-for="product in trending"
              :key="product.id"
              :product="product"
            />
          </div>
        </div>
      </div>
      <!-- Ads div -->
      <div class="my-12">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Smartwatch Card -->
          <div class="relative rounded-xl overflow-hidden">
            <img
              src="/images/01.png"
              alt="Smartwatches for all lifestyles"
              class="w-full h-80 md:h-96 object-cover"
              loading="lazy"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8 text-white"
            >
              <h3 class="text-2xl md:text-3xl font-bold mb-3">
                Track the Future
              </h3>
              <p class="text-base md:text-lg mb-6">
                Smartwatches for Every Lifestyle
              </p>
              <router-link
                to="/products/new-arrivals"
                class="relative w-28 flex items-center justify-center h-14 border-2 border-white text-white rounded-md hover:bg-[#ef4444] hover:border-[#ef4444] hover:text-white transition-all duration-300 ease-in-out font-semibold overflow-hidden group"
                aria-label="View more new arrivals"
              >
                <span class="relative z-10">See More</span>
                <span
                  class="absolute inset-0 bg-[#EB5E28] transform scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100"
                ></span>
              </router-link>
            </div>
          </div>

          <!-- Laptop Card -->
          <div class="relative rounded-xl overflow-hidden">
            <img
              src="/images/alien.jpg"
              alt="High-performance laptops"
              class="w-full h-80 md:h-96 object-cover"
              loading="lazy"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8 text-white"
            >
              <h3 class="text-2xl md:text-3xl font-bold mb-3">
                Find Your Ideal Laptop
              </h3>
              <p class="text-base md:text-lg mb-6">
                Empowered by Tomorrow's Technology
              </p>
              <router-link
                to="/products/new-arrivals"
                class="relative w-28 flex items-center justify-center h-14 border-2 border-white text-white rounded-md hover:bg-[#EB5E28] hover:border-[#EB5E28] hover:text-white transition-all duration-300 ease-in-out font-semibold overflow-hidden group mt-1"
                aria-label="View more new arrivals"
              >
                <span class="relative z-10">See More</span>
                <span
                  class="absolute inset-0 bg-[#EB5E28] transform scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100"
                ></span>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- New Arrivals -->
      <div class="my-24">
        <h2
          class="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-12 text-center"
        >
          New Arrivals
        </h2>
        <div v-if="loading" class="text-center text-gray-500">
          <Loader />
        </div>
        <div
          v-else-if="displayProducts.length === 0"
          class="text-center text-gray-500"
        >
          No new arrivals available.
        </div>
        <div v-else>
          <Swiper
            :slides-per-view="1"
            :space-between="8"
            :pagination="{ clickable: true, el: '.swiper-pagination' }"
            :loop="true"
            :autoplay="{ delay: 3000, disableOnInteraction: false }"
            :modules="modules"
            :breakpoints="{
              320: { slidesPerView: 1.5, spaceBetween: 8 },
              480: { slidesPerView: 1.5, spaceBetween: 8 },
              576: { slidesPerView: 1.5, spaceBetween: 10 },
              640: { slidesPerView: 2, spaceBetween: 10 },
              768: { slidesPerView: 3, spaceBetween: 12 },
              1024: { slidesPerView: 4, spaceBetween: 14 },
              1280: { slidesPerView: 5, spaceBetween: 16 },
              1536: { slidesPerView: 6, spaceBetween: 18 },
            }"
            class="w-full"
          >
            <SwiperSlide
              v-for="product in displayProducts.slice(0, 12)"
              :key="product.id"
              class="flex justify-center items-stretch"
            >
              <ProductCard :product="product" class="w-full h-1/2 mb-12" />
            </SwiperSlide>

            <!-- Pagination -->
            <div class="swiper-pagination mt-12 md:mt-24"></div>
          </Swiper>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { storeToRefs } from "pinia";
import ProductCard from "../components/ProductCard.vue";
import { useProductStore } from "../store/ProductStore";
import { trendingProducts } from "../services/auth.service";
import Loader from "../components/Loader.vue";
import { getCategories } from "@/services/auth.service";
import SkLoader from "@/components/skLoader.vue";

export default {
  name: "HomeView",
  components: {
    Swiper,
    SwiperSlide,
    ProductCard,
    Loader,
    SkLoader,
  },
  setup() {
    const productStore = useProductStore();
    const { products, loading } = storeToRefs(productStore);
    const displayProducts = computed(() => products.value || []);
    const categories = ref([]);
    const isLoading = ref(false);
    const trending = ref([]);

    const fetchCategories = async () => {
      isLoading.value = true;
      const response = await getCategories();
      if (response.status === 200) {
        categories.value = response.data.categories;
      } else {
        console.error("Failed to fetch categories:", response.data.message);
      }
      isLoading.value = false;
    };

    const fetchTrendingProducts = async () => {
      isLoading.value = true;
      const response = await trendingProducts();
      if (response?.data) {
        trending.value = response.data.trending;
        console.log("Trending Products:", trending.value);
      } else {
        console.warn("No trending products found");
      }
      isLoading.value = false;
    };

    onMounted(() => {
      fetchCategories();
      fetchTrendingProducts();
      productStore.fetchProducts();
    });

    return {
      products,
      loading,
      displayProducts,
      modules: [Navigation, Pagination, Autoplay],
      categories,
      isLoading,
      trending,
    };
  },
};
</script>
