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
  padding: .625rem 1rem;
  margin-right: 0.5rem;
  font-size: 12px;
  text-decoration: none;
  color: white;
  background-color: var(--primary-deep-gray);
  border-radius: 0.25rem;
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
