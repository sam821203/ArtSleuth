<template>
  <div class="layout--main">
    <base-dialog
      title="An error occurred!"
      :show="!!error"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <section class="hero m-top--xl">
      <div class="text-wrap">
        <div>
          <h1>Explore your <br />Best Artist.</h1>
          <p>
            Discover the remarkable potential of ArtSleuth. See what you can do
            on ArtSleuth - the best tool for artist finder.
          </p>
        </div>
        <div>
          <base-button
            v-if="!isLoggedIn"
            link
            to="/auth?redirect=register"
            class="cta-btn"
          >
            Get started
          </base-button>
          <base-button
            v-if="isLoggedIn && !isArtist && !isLoading"
            link
            to="/register"
          >
            Register
          </base-button>
        </div>
      </div>
      <div class="img-wrap m-top--xl">
        <img src="./hero-character.svg" alt="" />
      </div>
    </section>
    <section>
      <artist-filter @change-filters="setFilters" />
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadArtists(true)">
            Refresh
          </base-button>
        </div>
        <div v-if="isLoading">
          <base-spinner />
        </div>
        <ul v-else-if="hasArtists">
          <!-- 外層模板使用內層元件標籤時，以 v-bind 指令來將資料傳遞進來 -->
          <artist-item
            v-for="artist in filteredArtists"
            :id="artist.id"
            :key="artist.id"
            :cover-photo="artist.coverPhoto"
            :first-name="artist.firstName"
            :last-name="artist.lastName"
            :country="artist.country"
            :rate="artist.hourlyRate"
            :areas="artist.areas"
          />
        </ul>
        <h3 v-else>No artists found!</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted, toRef } from "vue";
import { useStore } from "vuex";

import ArtistItem from "../../components/artists/ArtistItem.vue";
import ArtistFilter from "../../components/artists/ArtistFilter.vue";

export default {
  components: {
    ArtistItem,
    ArtistFilter,
  },
  setup() {
    const store = useStore();

    const isLoading = ref(false);
    const error = ref(null);

    // reactive 會針對傳入的資料採用深層監聽的方式
    const activeFilters = reactive({
      painting: true,
      sculpture: true,
      prints: true,
    });

    // toRef 可以針對 reactive 中特定屬性轉換成 ref
    const activeFiltersRef = toRef(activeFilters);

    const isLoggedIn = computed(() => store.getters.isAuthenticated);
    const isArtist = computed(() => store.getters["artists/isArtist"]);
    const hasArtists = computed(
      () => !isLoading.value && store.getters["artists/hasArtists"]
    );

    const filteredArtists = computed(() => {
      const artists = store.getters["artists/getArtists"];

      return artists.filter((artist) => {
        if (
          activeFiltersRef.value.painting &&
          artist.areas.includes("painting")
        ) {
          return true;
        }
        if (
          activeFiltersRef.value.sculpture &&
          artist.areas.includes("sculpture")
        ) {
          return true;
        }
        if (activeFiltersRef.value.prints && artist.areas.includes("prints")) {
          return true;
        }
        return false;
      });
    });

    const setFilters = (updatedFilters) => {
      // 使用 Object.assign()將 updatedFilters 的屬性合併到 activeFilters 中，這樣才能保持響應式追蹤
      Object.assign(activeFilters, updatedFilters);
    };

    const loadArtists = async (refresh = false) => {
      isLoading.value = true;

      try {
        await store.dispatch("artists/loadArtists", {
          forceRefresh: refresh,
        });
      } catch (err) {
        error.value = err.message || "Something went wrong!";
      }

      // 當 loading 完成，轉換狀態
      isLoading.value = false;
    };

    const handleError = () => {
      error.value = null;
    };

    onMounted(loadArtists);

    return {
      isLoading,
      error,
      activeFilters,
      isLoggedIn,
      isArtist,
      hasArtists,
      filteredArtists,
      setFilters,
      loadArtists,
      handleError,
    };
  },
};

// vue2 =================================================================
// import ArtistItem from "../../components/artists/ArtistItem.vue";
// import ArtistFilter from "../../components/artists/ArtistFilter.vue";

// export default {
//   components: {
//     ArtistItem,
//     ArtistFilter,
//   },
//   data() {
//     return {
//       isLoading: false,
//       error: null,
//       activeFilters: {
//         frontend: true,
//         backend: true,
//         career: true,
//       },
//     };
//   },
//   computed: {
//     isLoggedIn() {
//       return this.$store.getters.isAuthenticated;
//     },
//     isArtist() {
//       return this.$store.getters["artists/isArtist"];
//     },
//     filteredArtists() {
//       const artists = this.$store.getters["artists/getArtists"];
//       return artists.filter((artist) => {
//         if (this.activeFilters.frontend && artist.areas.includes("frontend")) {
//           return true;
//         }
//         if (this.activeFilters.backend && artist.areas.includes("backend")) {
//           return true;
//         }
//         if (this.activeFilters.career && artist.areas.includes("career")) {
//           return true;
//         }
//         return false;
//       });
//     },
//     hasArtists() {
//       return !this.isLoading && this.$store.getters["artists/hasArtists"];
//     },
//   },
//   created() {
//     this.loadArtists();
//   },
//   methods: {
//     setFilters(updatedFilters) {
//       this.activeFilters = updatedFilters;
//     },
//     async loadArtists(refresh = false) {
//       this.isLoading = true;
//       try {
//         await this.$store.dispatch("artists/loadArtists", {
//           forceRefresh: refresh,
//         });
//       } catch (error) {
//         this.error = error.message || "Something went wrong!";
//       }

//       // 當 loading 完成，轉換狀態
//       this.isLoading = false;
//     },
//     handleError() {
//       this.error = null;
//     },
//   },
// };
</script>

<style scoped>
ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

.controls {
  display: flex;
  justify-content: space-between;
}

.layout--main {
  margin-left: auto;
  margin-right: auto;
  max-width: 1080px;
}

.img-wrap {
  width: 54%;
  transform: translateY(4%);
}

.text-wrap {
  width: 42%;
}

.hero {
  display: flex;
  justify-content: space-between;
}

.hero h1 {
  margin-bottom: 0;
  font-size: 64px;
  font-weight: 700;
}

.hero p {
  margin-bottom: 12%;
}
</style>
