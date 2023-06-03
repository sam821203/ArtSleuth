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
      default: "/",
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
  padding: 0.625rem 1rem;
  margin-right: 0.5rem;
  font-size: 12px;
  text-align: center;
  text-decoration: none;
  color: white;
  background-color: var(--primary-deep-gray);
  border-radius: 0.25rem;
  transition: all 0.3s ease;
  cursor: pointer;
}

a:hover,
a:active,
button:hover,
button:active {
  border-color: #000;
}

a:last-child {
  margin-right: 0;
}

.flat {
  color: #3a0061;
  background-color: transparent;
  border: none;
}

.outline {
  color: #000;
  background-color: transparent;
  border: 1px #000 solid;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  color: #fff;
  background-color: #000;
}

.cta-btn {
  padding: 1rem 2.25rem;
  font-size: 1rem;
  background-color: #c7b8f8;
  border-radius: 50px;
  font-weight: 700;
}

.cta-btn:hover {
  background-color: #a498cf;
}
</style>
