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
  letter-spacing: 0.2px;
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
  color: #000;
  background-color: transparent;
  border: none;
}

.outline {
  color: #000;
  background-color: transparent;
  border: 1px #000 solid;
}

.underline {
  text-decoration: underline;
}

.flat:hover,
.flat:active {
  color: #000;
  background-color: #fff;
}

.outline:hover,
.outline:active {
  color: #fff;
  background-color: #000;
}

.emphasis {
  width: 126px;
  height: 42px;
  font-size: 1rem;
  text-align: center;
  color: #fff;
  background-color: #000;
  border: none;
  border-radius: 4px;
  line-height: 130%;
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
