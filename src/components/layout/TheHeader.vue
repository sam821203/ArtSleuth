<template>
  <header>
    <nav>
      <router-link to="/">
        <div class="logo">
          <img src="./logo.png" alt="">
        </div>
        <h1>ArtSleuth</h1>
      </router-link>
      <ul>
        <li>
          <router-link to="/artists"> Our Artists </router-link>
        </li>
        <li v-if="isLoggedIn">
          <router-link to="/requests"> Messages </router-link>
        </li>
        <li v-else>
          <router-link to="/auth"> Login </router-link>
        </li>
        <li v-if="isLoggedIn">
          <base-button @click="logout"> Logout </base-button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/artists");
    },
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
  padding: 0.5rem 1rem;
  text-decoration: none;
  border: 1px solid transparent;
  transition: all .3s ease;
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

ul a:active,
ul a:hover,
ul a.router-link-active {
  /* border: 1px solid var(--primary-deep-gray); */

  /* text-decoration: underline; */
  color: #898989;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  width: 90%;
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
</style>
