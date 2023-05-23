<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>$ {{ rate }}/hour</h3>
      </base-card>
    </section>

    <!-- Contact -->
    <section>
      <header>
        <base-card>
          <h2>Interested? Reach out now!</h2>
          <base-button link :to="contactLink">
            Contact
          </base-button>
          <!-- 這裡放 nested 的 contact form -->
          <router-view />
        </base-card>
      </header>
    </section>

    <!-- Badge -->
    <section>
      <base-card>
        <base-badge
          v-for="area in areas"
          :key="area"
          :type="area"
          :title="area"
        />
        <p>{{ description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      selectedArtist: null,
    };
  },
  computed: {
    fullName() {
      return `${this.selectedArtist.firstName} ${this.selectedArtist.lastName}`;
    },
    areas() {
      return this.selectedArtist.areas;
    },
    rate() {
      return this.selectedArtist.hourlyRate;
    },
    description() {
      return this.selectedArtist.description;
    },
    contactLink() {
      return `${this.$route.path}/${this.id}/contact`;
    },
  },
  created() {
    this.selectedArtist = this.$store.getters['artists/getArtists'].find(
      (artist) => artist.id === this.id,
    );
  },
};
</script>
