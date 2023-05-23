<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Authenticating..." fixed>
      <base-spinner />
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">E-mail</label>
          <input id="email" v-model.trim="email" type="email">
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input
            id="password"
            v-model.trim="password"
            type="password"
            autocomplete="on"
          >
        </div>
        <p v-if="!formIsValid">
          Please enter a valid email and password! (Must be at least 6 characters long.)
        </p>
        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode">
          {{ switchModeCaption }}
        </base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === 'login') {
        return 'Login';
      }
      return 'Signup';
    },
    switchModeCaption() {
      if (this.mode === 'login') {
        return 'Signup';
      }
      return 'Login';
    },
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;

      if (this.email === '' || !this.email.includes('@') || this.password.length < 6) {
        this.formIsValid = false;
      }

      // if passed validation step
      this.isLoading = true;

      // send http request...
      try {
        if (this.mode === 'login') {
          // ..
        } else {
          await this.$store.dispatch('signup', {
            email: this.email,
            password: this.password,
          });
        }
      } catch (err) {
        this.error = err.message || 'Failed to authenticate, try later.';
      }

      // if finished dispatching
      this.isLoading = false;
    },
    switchAuthMode() {
      if (this.mode === 'login') {
        this.mode = 'signup';
      } else {
        this.mode = 'login';
      }
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
form {
  padding: 1rem;
  margin: 1rem;
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
</style>
