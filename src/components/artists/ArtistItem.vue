<template>
  <li>
    <div class="inner__left">
      <div class="img-wrap">
        <img :src="coverPhoto" alt="" />
      </div>
    </div>
    <div class="inner__center">
      <div class="born">
        <h6>{{ country }},</h6>
        <h6>b. {{ birthdayYear }}</h6>
      </div>
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
        <div><span>20</span>requests</div>
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
    "coverPhoto",
    "firstName",
    "lastName",
    "country",
    "birthday",
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
    const birthdayYear = computed(() => props.birthday.split("-")[0]);

    return {
      fullName,
      artistContactLink,
      artistDetailsLink,
      birthdayYear,
    };
  },
};
</script>

<style scoped>
li {
  display: flex;
  padding: 1.75rem;
  margin-bottom: 2rem;
  height: 198px;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.08) 0 4px 12px;
  transition: all 0.2s ease;
}

li:first-child {
  margin-top: 1rem;
}

li > div:first-child {
  width: 18%;
}

li > div:nth-child(2) {
  width: 54%;
}

li > div:last-child {
  width: 28%;
}

li:hover {
  box-shadow: rgba(0, 0, 0, 0.06) 0 10px 20px;
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
  line-height: 140%;
}

.img-wrap {
  margin-left: 4%;
  width: 140px;
  height: 140px;
}

.img-wrap img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
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
  margin-right: 3px;
  font-size: 1.25rem;
  color: #000;
  font-weight: 500;
}

.inner__center h3 {
  margin-bottom: 3%;
}

.born {
  display: flex;
}

.born h6 {
  margin-right: 2%;
}
</style>
