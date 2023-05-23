<template>
  <header>
    <nav>
      <h1>
        <router-link to="/">
          ArtSleuth
        </router-link>
      </h1>
      <ul>
        <li>
          <router-link to="/artists">
            Our Artists
          </router-link>
        </li>
        <li>
          <router-link to="/requests">
            Messages
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 4rem;
  background-color: #3d008d;
}

h1 {
  margin: 0;
}

header a {
  display: inline-block;
  padding: 0.5rem 1rem;
  text-decoration: none;
  border: 1px solid transparent;
}

h1 a {
  margin: 0;
  color: white;
}

header ul a {
  color: #f391e3;
}

a:active,
a:hover,
a.router-link-active {
  /* border: 1px solid #f391e3; */
  font-style: bold;
  text-decoration: underline;
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
</style>
