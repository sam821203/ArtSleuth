<template>
  <button v-if="!link" :class="mode">
    <slot />
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot />
  </router-link>
</template>

<script>
export default {
  props: {
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: '/',
    },
    mode: {
      type: String,
      required: false,
      default: null,
    },
  },
};
</script>

<style scoped>
button,
a {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  margin-right: 0.5rem;
  text-decoration: none;
  color: white;
  background-color: #3a0061;
  border: 1px solid #3a0061;
  border-radius: 30px;
  font: inherit;
  cursor: pointer;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #270041;
  border-color: #270041;
}

.flat {
  color: #3a0061;
  background-color: transparent;
  border: none;
}

.outline {
  color: #270041;
  background-color: transparent;
  border-color: #270041;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #edd2ff;
}
</style>
