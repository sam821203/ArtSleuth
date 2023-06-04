<template>
  <div class="user-auth">
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
          <input
            id="email"
            v-model.trim="email"
            type="email"
            placeholder="name@example.com"
          />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input
            id="password"
            v-model.trim="password"
            type="password"
            autocomplete="on"
            placeholder="12345678"
          />
        </div>
        <p v-if="!formIsValid">
          Please enter a valid email and password! (Must be at least 6
          characters long.)
        </p>
        <div class="buttons">
          <base-button>{{ submitButtonCaption }}</base-button>
          <base-button
            type="button"
            mode="outline underline"
            @click="switchAuthMode"
          >
            {{ switchModeCaption }}
          </base-button>
        </div>
      </form>
    </base-card>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const email = ref("");
    const password = ref("");
    const mode = ref("login");
    const formIsValid = ref(true);
    const isLoading = ref(false);
    const error = ref(null);

    const submitButtonCaption = computed(() => {
      if (mode.value === "login") {
        return "Login";
      }
      return "Signup";
    });

    const switchModeCaption = computed(() => {
      if (mode.value === "login") {
        return "Signup";
      }
      return "Login";
    });

    // 箭頭函數本身不能被聲明為 async 函數，正確的寫法是將箭頭函數改寫為普通的命名函數，然後在函數內部使用 async 鍵字聲明該函數為 async 函數
    const submitForm = async () => {
      formIsValid.value = true;

      if (
        email.value === "" ||
        !email.value.includes("@") ||
        password.value.length < 6
      ) {
        formIsValid.value = false;
      }

      // if passed validation step
      isLoading.value = true;

      // send http request...
      const actionPayload = {
        email: email.value,
        password: password.value,
      };

      try {
        if (mode.value === "login") {
          await store.dispatch("login", actionPayload);
        } else {
          await store.dispatch("signup", actionPayload);
        }

        // 在 query 的需要接在 ArtistsList 接的 redirect
        const redirectUrl = `/${"artists"}`;

        // Login 後，redirect 到不同路徑
        router.replace(redirectUrl);
      } catch (err) {
        error.value = err.message || "Failed to authenticate, try later.";
      }

      // if finished dispatching
      isLoading.value = false;
    };

    const switchAuthMode = () => {
      if (mode.value === "login") {
        mode.value = "signup";
      } else {
        mode.value = "login";
      }
    };

    const handleError = () => {
      error.value = null;
    };

    return {
      email,
      password,
      formIsValid,
      mode,
      isLoading,
      error,
      submitButtonCaption,
      switchModeCaption,
      submitForm,
      switchAuthMode,
      handleError,
    };
  },
};
</script>

<style scoped>
form {
  padding: 1rem;
  margin: 1rem;
}

.form-control {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input,
textarea {
  display: block;
  padding: 0.35rem;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
  border-radius: 4px;
}

.user-auth {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  max-width: 540px;
  transform: translate(-50%, -50%);
}

.buttons {
  display: flex;
  flex-direction: column;
  margin-top: 2.5rem;
}

.buttons button {
  margin-bottom: 1rem;
  margin-right: 0;
  font-size: 1rem;
  border: 0;
}
</style>
