<template>
  <section>
    <artist-filter @change-filters="setFilters"></artist-filter>
  </section>
  <section>
    <base-card>
      <div class="controls"></div>
      <ul>
        <base-button mode="outline">Refresh</base-button>
        <base-button link to="/register">Register</base-button>
      </ul>
      <ul v-if="hasArtists">
        <!-- 外層模板使用內層元件標籤時，以 v-bind 指令來將資料傳遞進來 -->
        <artist-item
          v-for="artist in filteredArtists"
          :key="artist.id"
          :id="artist.id"
          :first-name="artist.firstName"
          :last-name="artist.lastName"
          :rate="artist.hourlyRate"
          :areas="artist.areas"
        ></artist-item>
      </ul>
      <h3 v-else>No artists found!</h3>
    </base-card>
  </section>
</template>

<script>
import ArtistItem from "../../components/artists/ArtistItem.vue";
import ArtistFilter from "../../components/artists/ArtistFilter.vue";

export default {
  components: {
    ArtistItem,
    ArtistFilter,
  },
  data() {
    return {
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    filteredArtists() {
      const artists = this.$store.getters["artists/getArtists"];

      return artists.filter((artist) => {
        if (this.activeFilters.frontend && artist.areas.includes("frontend")) {
          return true;
        }
        if (this.activeFilters.backend && artist.areas.includes("backend")) {
          return true;
        }
        if (this.activeFilters.career && artist.areas.includes("career")) {
          return true;
        }

        return false;
      });
    },
    hasArtists() {
      return this.$store.getters["artists/hasArtists"];
    },
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
