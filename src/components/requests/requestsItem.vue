<template>
  <li>
    <div>
      <a :href="emailLink">{{ email }}</a>
    </div>
    <p>{{ message }}</p>
  </li>
</template>

<script>
export default {
  props: ['email', 'message'],
  computed: {
    emailLink() {
      return `mailto:${this.email}`;
    },
  },
};
</script>

<style scoped>
li {
  padding: 1rem;
  margin: 1rem 0;
  border: 1px solid #ccc;
}

a {
  text-decoration: none;
  color: #3d008d;
  font-weight: bold;
}

a:hover,
a:active {
  color: #8d007a;
}

p {
  margin: 0.5rem 0 0;
}
</style>
