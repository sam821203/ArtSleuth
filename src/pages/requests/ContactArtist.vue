<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="">Your email</label>
      <input id="email" v-model.trim="email" type="email">
    </div>
    <div class="form-control">
      <label for="message">Message</label>
      <textarea id="message" v-model.trim="message" rows="5" />
    </div>
    <p v-if="!formIsValid" class="errors">
      Please enter valid email!
    </p>
    <div class="actions">
      <base-button>Send Message</base-button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      message: '',
      formIsValid: true,
    };
  },
  methods: {
    submitForm() {
      this.formIsValid = true;

      if (
        this.email === ''
        || !this.email.includes('@')
        || this.message === ''
      ) {
        this.formIsValid = false;
        return;
      }

      // requests/contactArtist 前面是 namespaced，後面是 actions 名稱
      this.$store.dispatch('requests/contactArtist', {
        email: this.email,
        message: this.message,
        artistId: this.$route.params.id,
      });

      this.$router.replace('/artists');
    },
  },
};
</script>

<style scoped>
form {
  padding: 1rem;
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
}

.form-control {
  margin: 0.5rem 0;
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
}

input:focus,
textarea:focus {
  background-color: #faf6ff;
  border-color: #3d008d;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
