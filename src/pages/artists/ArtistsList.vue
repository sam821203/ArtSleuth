<template>
  <div class="layout--main">
    <base-dialog
      title="An error occurred!"
      :show="!!error"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <section class="hero m-top--xxl">
      <div class="text-wrap">
        <div>
          <h1>Explore your <br />Best Artist.</h1>
          <p>
            Experience the unparalleled features and functionalities of
            ArtSleuth, your gateway to the vibrant world of art - the best tool
            for artist finder.
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
            class="cta-btn"
          >
            Register now
          </base-button>
          <base-button
            v-if="isLoggedIn && isArtist && !isLoading"
            link
            to="/artists"
            class="cta-btn"
          >
            Explore more
          </base-button>
        </div>
      </div>
      <div class="img-wrap m-top--sm">
        <img src="./hero-character.svg" alt="" />
      </div>
    </section>
    <section>
      <artist-filter @change-filters="setFilters" />
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="flat" @click="loadArtists(true)">
            <span>Refresh</span>
            <img src="./refresh.svg" alt="" />
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
            :birthday="artist.birthday"
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
      limitedEdition: true,
      unique: true,
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
          activeFiltersRef.value.limitedEdition &&
          artist.areas.includes("limitedEdition")
        ) {
          return true;
        }
        if (activeFiltersRef.value.unique && artist.areas.includes("unique")) {
          return true;
        }
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
</script>

<style scoped>
ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

.controls {
  display: flex;
  justify-content: end;
  opacity: 0.6;
}

.controls button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0;
  padding-right: 0;
  margin-right: 0;
}

.controls span {
  margin-right: 2%;
  font-size: 1rem;
  font-weight: 500;
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
  margin-bottom: 4%;
  font-size: 64px;
  font-weight: 700;
  line-height: 140%;
}

.hero p {
  margin-bottom: 8%;
  line-height: 180%;
  letter-spacing: 0.1px;
}
</style>
