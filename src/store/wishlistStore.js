import { favorite, allfavourites } from "@/services/auth.service";
import { defineStore } from "pinia";

export const useFavouriteStore = defineStore("wishlist", {
  state: () => ({
    favourites: [],
    onLoading: false,
  }),
  actions: {
    async fetchFavourites() {
      this.onLoading = true;
      try {
        const response = await allfavourites();
        const data = response.data;
        console.log("Favorites response:", data);
        this.favourites = (data?.favorites || []).map((fav) => fav.product);
      } catch (error) {
        console.error("Error fetching favourites:", error);
      } finally {
        this.onLoading = false;
      }
    },
    async toggleFavourite(product) {
      this.onLoading = true;
      try {
        console.log("Adding/removing favourite:", product);
        const resData = await favorite({ product_id: product.id }); // No `.json()` here
        console.log("Favourite API response:", resData);

        const exists = this.favourites.find((p) => p.id === product.id);
        if (exists) {
          this.favourites = this.favourites.filter((p) => p.id !== product.id);
        } else {
          this.favourites.push(product);
        }
      } catch (error) {
        console.error("Failed to toggle favourite:", error);
      } finally {
        this.onLoading = false;
      }
    },
  },
  getters: {
    isFavourited: (state) => (id) => state.favourites.some((p) => p.id === id),
    favouriteCount: (state) => state.favourites.length,
  },
});
