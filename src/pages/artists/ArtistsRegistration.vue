<template>
  <section>
    <base-card>
      <h2>Register as an Artist now!</h2>
      <artist-form @save-data="saveData" />
    </base-card>
  </section>
</template>

<script>
import ArtistForm from '../../components/artists/ArtistForm.vue';

export default {
  components: {
    ArtistForm,
  },
  methods: {
    saveData(data) {
      this.$store.dispatch('artists/registerArtist', data);

      this.$router.replace('/artists');
    },
  },
};
</script>
