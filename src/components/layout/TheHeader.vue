<template>
  <header>
    <nav class="header__wrap">
      <div class="header__wrap--left">
        <router-link to="/">
          <div class="logo">
            <img src="./logo.png" alt="" />
          </div>
          <h1>ArtSleuth</h1>
        </router-link>
        <ul>
          <router-link to="/artists">
            <li>Home</li>
          </router-link>
          <a href="javascript:void(0)">
            <li>About Us</li>
          </a>
          <a href="javascript:void(0)">
            <li>Services</li>
          </a>
          <a href="javascript:void(0)">
            <li>Contact</li>
          </a>
        </ul>
      </div>
      <ul>
        <li v-if="isLoggedIn">
          <router-link to="/requests"> Messages </router-link>
        </li>
        <li v-else>
          <router-link to="/auth" class="header__auth signup">
            <span>Sign Up</span>
          </router-link>
          <router-link to="/auth" class="header__auth login">
            <span>Login</span>
          </router-link>
        </li>
        <li v-if="isLoggedIn">
          <base-button mode="emphasis" @click="logout"> Logout </base-button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const isLoggedIn = computed(() => store.getters.isAuthenticated);

    const logout = () => {
      store.dispatch("logout");
      router.replace("/artists");
    };
    return {
      isLoggedIn,
      logout,
    };
  },
};
</script>

<style scoped>
header {
  position: fixed;
  top: 0;
  z-index: 40;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70px;
  background-color: #ffffffc3;
  border-bottom-width: 1px;
  box-shadow: 0 0 #0000, 0 0 #0000, 0 6px 10px hsla(0deg, 0%, 50%, 0.08);
  backdrop-filter: blur(16px);
}

h1 {
  margin: 0;
}

header a {
  display: inline-block;
  padding: 0.6rem;
  text-decoration: none;
  border: 1px solid transparent;
  transition: all 0.3s ease;
}

h1 a {
  margin: 0;
  color: var(--primary-deep-gray);
  font-weight: 700;
}

nav > a {
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--primary-deep-gray);
}

nav > a img {
  width: 100%;
  height: 100%;
}

header ul a {
  color: var(--primary-deep-gray);
  font-weight: 500;
}

.header__wrap--left {
  display: flex;
  align-items: center;
}

.header__wrap--left a {
  display: flex;
  color: var(--primary-deep-gray);
}

ul a:hover {
  /* border: 1px solid var(--primary-deep-gray); */

  /* text-decoration: underline; */
  color: #898989;
}

h1 a:hover {
  border-color: transparent;
}

header nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 36px 1px;
  width: 100%;
  max-width: 1840px;
}

header ul {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  list-style: none;
}

li {
  margin: 0 0.5rem;
}

.logo {
  margin-right: 4px;
  max-width: 32px;
}

.logo img {
  margin-bottom: 3px;
}

.header__auth {
  width: 126px;
  height: 40px;
  text-align: center;
  line-height: 120%;
  border-radius: 4px;
}

.signup {
  margin-right: 8px;
  border: 1px #000 solid;
}

.login {
  color: #fff;
  background-color: #000;
}
</style>
