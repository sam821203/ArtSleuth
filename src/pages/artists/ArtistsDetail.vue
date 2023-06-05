<template>
  <div class="layout--main m-top--xl">
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>$ {{ rate }}/hour</h3>
      </base-card>
    </section>

    <!-- Badge -->
    <section class="badge">
      <base-card>
        <base-badge
          v-for="area in areas"
          :key="area"
          :type="area"
          :title="area"
          class="m-bottom--xxs"
        />
        <p>{{ description }}</p>
      </base-card>
    </section>

    <!-- Contact -->
    <section>
      <header>
        <base-card>
          <h3 class="m-bottom--xxs">Interested? Reach out now!</h3>
          <base-button
            link
            :to="contactLink"
            mode="emphasis"
            class="m-bottom--sm"
          >
            Contact
          </base-button>
          <!-- 這裡放 nested 的 contact form -->
          <router-view />
        </base-card>
      </header>
    </section>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  props: ["id"],
  setup(props) {
    const selectedArtist = ref(null);
    const router = useRouter();
    const store = useStore();

    const fullName = computed(() => {
      if (selectedArtist.value) {
        return `${selectedArtist.value.firstName} ${selectedArtist.value.lastName}`;
      }
      return "";
    });

    // setup 函數中的 computed 是在每次重新渲染時重新計算的，因此需要更謹慎地處理可能為 null 或 undefined 的值
    // 可選串連運算子 ?. 來處理 null 或 undefined
    const areas = computed(() => selectedArtist.value?.areas);
    const rate = computed(() => selectedArtist.value?.hourlyRate);
    const description = computed(() => selectedArtist.value?.description);
    const contactLink = computed(
      () => `${router.currentRoute.value.path}/contact`
    );

    // onMounted Hooks 來代替 Vue 2 中的 created Hooks，確保在组件掛載後執行相關邏輯
    onMounted(() => {
      selectedArtist.value = store.getters["artists/getArtists"].find(
        (artist) => artist.id === props.id
      );
    });

    return {
      selectedArtist,
      fullName,
      areas,
      rate,
      description,
      contactLink,
    };
  },
};
</script>
