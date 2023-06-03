<template>
  <li>
    <div>
      <img :src="coverPhoto" alt="" />
    </div>
    <h6>{{ country }}</h6>
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
      <base-button link :to="artistDetailsLink"> View Details </base-button>
    </div>
  </li>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";

export default {
  props: [
    "id",
    "coverPhoto",
    "firstName",
    "lastName",
    "country",
    "rate",
    "areas",
  ],
  setup(props) {
    const route = useRoute();

    const fullName = computed(() => `${props.firstName} ${props.lastName}`);
    const artistContactLink = computed(
      () => `${route.path}/${props.id}/contact`
    );
    const artistDetailsLink = computed(() => `${route.path}/${props.id}`);

    return {
      fullName,
      artistContactLink,
      artistDetailsLink,
    };
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
