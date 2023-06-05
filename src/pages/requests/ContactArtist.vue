<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="">Your email</label>
      <input id="email" v-model.trim="email" type="email" />
    </div>
    <div class="form-control">
      <label for="message">Message</label>
      <textarea id="message" v-model.trim="message" rows="5" />
    </div>
    <p v-if="!formIsValid" class="errors">Please enter valid email!</p>
    <div class="actions m-bottom--xs">
      <base-button mode="emphasis">Send Message</base-button>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const email = ref("");
    const message = ref("");
    const formIsValid = ref(true);

    const submitForm = () => {
      formIsValid.value = true;

      if (
        email.value === "" ||
        !email.value.includes("@") ||
        message.value === ""
      ) {
        formIsValid.value = false;
        return;
      }

      // requests/contactArtist 前面是 namespaced，後面是 actions 名稱
      store.dispatch("requests/contactArtist", {
        email: email.value,
        message: message.value,
        artistId: route.params.id,
      });

      router.replace("/artists");
    };

    return {
      email,
      message,
      formIsValid,
      submitForm,
    };
  },
};
</script>

<style scoped>
form {
  padding: 1rem;
  margin: 1rem 0;
  border: 1px solid #ccc;
  border-radius: var(--primary-border-radius);
}

.form-control {
  margin: 0.5rem 0 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input,
textarea {
  display: block;
  padding: 0.15rem;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
  border-radius: var(--primary-border-radius);
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}

.actions button {
  padding: 0 1.5rem;
  width: auto;
  max-width: 170px;
  height: 44px;
}
</style>
