<template>
  <div>
    <base-dialog title="An error occurred!" :show="!!error" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <artist-filter @change-filters="setFilters" />
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadArtists(true)">
            Refresh
          </base-button>
          <base-button v-if="!isLoggedIn" link to="/auth?redirect=register">
            Login to Register
          </base-button>
          <base-button v-if="isLoggedIn && !isArtist && !isLoading" link to="/register">
            Register
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
            :first-name="artist.firstName"
            :last-name="artist.lastName"
            :rate="artist.hourlyRate"
            :areas="artist.areas"
          />
        </ul>
        <h3 v-else>
          No artists found!
        </h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import ArtistItem from '../../components/artists/ArtistItem.vue';
import ArtistFilter from '../../components/artists/ArtistFilter.vue';

export default {
  components: {
    ArtistItem,
    ArtistFilter,
  },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    isArtist() {
      return this.$store.getters['artists/isArtist'];
    },
    filteredArtists() {
      const artists = this.$store.getters['artists/getArtists'];

      return artists.filter((artist) => {
        if (this.activeFilters.frontend && artist.areas.includes('frontend')) {
          return true;
        }
        if (this.activeFilters.backend && artist.areas.includes('backend')) {
          return true;
        }
        if (this.activeFilters.career && artist.areas.includes('career')) {
          return true;
        }

        return false;
      });
    },
    hasArtists() {
      return !this.isLoading && this.$store.getters['artists/hasArtists'];
    },
  },
  created() {
    this.loadArtists();
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadArtists(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('artists/loadArtists', {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }

      // 當 loading 完成，轉換狀態
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
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
  justify-content: space-between;
}
</style>
