<template>
  <div class="m-top--xl">
    <base-dialog
      title="An error occurred!"
      :show="!!error"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <header>
          <h2 class="m-bottom--xs">Requests Received</h2>
        </header>
        <base-spinner v-if="isLoading" />
        <ul v-else-if="hasRequests && !isLoading">
          <requests-item
            v-for="req in receivedRequests"
            :key="req.id"
            :email="req.userEmail"
            :message="req.userMessage"
          />
        </ul>
        <h3 v-else>You haven't received any requests yet!</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

import RequestsItem from "../../components/requests/requestsItem.vue";

export default {
  components: {
    RequestsItem,
  },
  setup() {
    const store = useStore();

    const isLoading = ref(false);
    const error = ref(null);

    const receivedRequests = computed(
      () =>
        // namespaced / getters
        store.getters["requests/requests"]
    );

    console.log(receivedRequests);
    const hasRequests = computed(() => store.getters["requests/hasRequests"]);

    const loadRequests = async () => {
      isLoading.value = true;

      try {
        await store.dispatch("requests/fetchRequests");
      } catch (err) {
        error.value = err.message || "Something failed!";
      }

      isLoading.value = false;
    };

    const handleError = () => {
      error.value = null;
    };

    onMounted(loadRequests);

    return {
      isLoading,
      error,
      receivedRequests,
      hasRequests,
      loadRequests,
      handleError,
    };
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  padding: 0;
  margin: 2rem auto;
  max-width: 30rem;
  list-style: none;
}

h3 {
  text-align: center;
}
</style>
