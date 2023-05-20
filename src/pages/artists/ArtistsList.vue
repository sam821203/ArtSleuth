<template>
  <section>filter</section>
  <section>
    <div class="controls"></div>
    <ul>
      <button>Refresh</button>
      <router-link to="/register">Register</router-link>
    </ul>
    <ul v-if="hasArtists">
      <li v-for="artist in filteredArtists" :key="artist.id">
        {{ artist.firstName }}
      </li>
    </ul>
    <h3 v-else>No artists found!</h3>
  </section>
</template>

<script>
export default {
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
