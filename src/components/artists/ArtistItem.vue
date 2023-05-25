<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>${{ rate }}/hour</h4>
    <div>
      <base-badge
        v-for="area in areas"
        :key="area"
        :type="area"
        :title="area"
      />
    </div>
    <div class="actions">
      <base-button link mode="outline" :to="artistContactLink">
        Contact
      </base-button>
      <base-button link :to="artistDetailsLink">
        View Details
      </base-button>
    </div>
  </li>
</template>

<script>
export default {
  props: ['id', 'firstName', 'lastName', 'rate', 'areas'],
  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
    artistContactLink() {
      return `${this.$route.path}/${this.id}/contact`;
    },
    artistDetailsLink() {
      return `${this.$route.path}/${this.id}`;
    },
  },
};
</script>

<style scoped>
li {
  padding: 1rem;
  margin: 1rem 0;

  /* border: 1px solid var(--primary-light-gray); */
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.08) 0 4px 16px;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
