<template>
  <section>
    <base-card>
      <h2>Register as an Artist now!</h2>
      <artist-form @save-data="saveData" />
    </base-card>
  </section>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import ArtistForm from "../../components/artists/ArtistForm.vue";

export default {
  components: {
    ArtistForm,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const saveData = (data) => {
      store.dispatch("artists/registerArtist", data);
      router.replace("/artists");
    };

    return {
      saveData,
    };
  },
};
</script>
