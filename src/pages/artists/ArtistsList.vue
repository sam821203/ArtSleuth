<template>
  <section>filter</section>
  <section>
    <div class="controls"></div>
    <ul>
      <button>Refresh</button>
      <router-link to="/register">Register</router-link>
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
  </section>
</template>

<script>
import ArtistItem from "../../components/artists/ArtistItem.vue";

export default {
  components: {
    ArtistItem,
  },
  computed: {
    filteredArtists() {
      return this.$store.getters["artists/getArtists"];
    },
    hasArtists() {
      return this.$store.getters["artists/hasArtists"];
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
