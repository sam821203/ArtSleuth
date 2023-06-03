<template>
  <li>
    <div class="inner__left">
      <div class="cover-photo">
        <!-- <img :src="coverPhoto" alt="" /> -->
        <img src="./default-cover-photo.png" alt="" />
      </div>
    </div>
    <div class="inner__center">
      <h6>{{ country }}</h6>
      <h3>{{ fullName }}</h3>
      <div>
        <base-badge
          v-for="area in areas"
          :key="area"
          :type="area"
          :title="area"
        />
      </div>
    </div>
    <div class="inner__right">
      <div class="extra-info">
        <div>
          <span>${{ rate }}</span>
          /hour
        </div>
        <div><span>39</span>requests</div>
        <div><span>55</span>works</div>
      </div>
      <div class="actions">
        <base-button link mode="outline" :to="artistContactLink">
          Contact
        </base-button>
        <base-button link :to="artistDetailsLink"> View more </base-button>
      </div>
    </div>
  </li>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";

export default {
  props: [
    "id",
    // "coverPhoto",
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
  display: flex;
  padding: 1.75rem;
  margin: 1rem 0;

  /* border: 1px solid var(--primary-light-gray); */
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.08) 0 4px 16px;
}

li > div:first-child {
  width: 20%;
}

li > div:nth-child(2) {
  width: 52%;
}

li > div:last-child {
  width: 28%;
}

h3 {
  font-size: 1.25rem;
}

h6 {
  font-size: 0.75rem;
  font-weight: normal;
  color: #9a9a9a;
}

.actions {
  display: flex;
  justify-content: flex-end;
}

.actions a {
  padding: 0.625rem 0;
  width: 94px;
  height: 36px;
}

.cover-photo {
  width: auto;
  max-width: 140px;
  height: auto;
  max-height: 140px;
}

.cover-photo img {
  border-radius: 50%;
}

.inner__right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.inner__right .extra-info {
  display: flex;
  justify-content: end;
}

.inner__right .extra-info > :not(div:last-child) {
  margin-right: 24px;
}

.inner__right .extra-info > div {
  font-size: 0.75rem;
  color: #9a9a9a;
}

.inner__right .extra-info > div span {
  margin-right: 4px;
  font-size: 1.25rem;
  color: #000;
  font-weight: 500;
}

.inner__center h6 {
  margin-bottom: 4px;
}

.inner__center h3 {
  margin-bottom: 16px;
}
</style>
