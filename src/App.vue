<template>
  <the-header />
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component" />
    </transition>
  </router-view>
</template>
<script>
import { computed, watch, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import TheHeader from "./components/layout/TheHeader.vue";

export default {
  components: {
    TheHeader,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const didAutoLogout = computed(() => store.getters.didAutoLogout);

    const keepLogin = () => {
      store.dispatch("keepLogin");
    };

    watch(didAutoLogout, (newVal, oldVal) => {
      if (newVal && newVal !== oldVal) {
        router.replace("/artists");
      }
    });

    onMounted(() => {
      keepLogin();
    });

    return { didAutoLogout, keepLogin };
  },
};
</script>

<style>
@import "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap";

:root {
  --primary-deep-gray: rgb(31, 31, 31);
  --primary-light-gray: #eee;
  --primary: #c7b8f8;
  --primary-border-radius: 4px;
}

/*
  Josh's Custom CSS Reset
  https://www.joshwcomeau.com/css/custom-css-reset/
*/
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

html {
  height: 100%;
}

body {
  font-family: Poppins, sans-serif;
}

img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}

input,
button,
textarea,
select {
  font: inherit;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}

.d-flex {
  display: flex;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translate(0);
}

.m-top--xs {
  margin-top: 2%;
}

.m-top--sm {
  margin-top: 4%;
}

.m-top--md {
  margin-top: 6%;
}

.m-top--lg {
  margin-top: 8%;
}

.m-top--xl {
  margin-top: 10%;
}

.m-top--xxl {
  margin-top: 14%;
}

.m-top--3xl {
  margin-top: 18%;
}

.m-bottom--xxs {
  margin-bottom: 1%;
}

.m-bottom--xs {
  margin-bottom: 2%;
}

.m-bottom--sm {
  margin-bottom: 4%;
}

.m-bottom--xl {
  margin-bottom: 10%;
}

img {
  max-width: 100%;
  height: auto;
  border: 0;
  vertical-align: middle;
}

::placeholder {
  padding-left: 8px;

  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #ccc;
  opacity: 1; /* Firefox */
}

.filter__option input {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  vertical-align: middle;
  cursor: pointer;
}

input:focus,
textarea:focus {
  background-color: #ededed;
  border-color: #a9a9a9;
  outline: none;
}

input:-webkit-autofill,
input:-webkit-autofill:focus {
  transition: background-color 600000s 0s, color 600000s 0s;
}

.layout--main {
  margin-left: auto;
  margin-right: auto;
  max-width: 1080px;
}

.filter__option {
  position: relative;
  display: block;
  margin-right: 1rem;
  cursor: pointer;
  user-select: none;
}

.filter__option label {
  margin-left: 1.85rem;
  cursor: pointer;
}

.filter__option.active label {
  font-weight: bold;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  width: 24px;
  height: 24px;
  background-color: transparent;
  border: 1px solid #c7b8f8;
}

.filter__option:hover input ~ .checkmark {
  background-color: transparent;
}

.filter__option input:checked ~ .checkmark {
  border: 1px solid #c7b8f8;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark::after {
  content: "";
  position: absolute;
  display: none;
}

/* Style the checkmark/indicator */
.filter__option .checkmark::after {
  top: 3.8px;
  left: 7.4px;
  width: 7.4px;
  height: 12px;
  border: solid #c7b8f8;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}

/* Show the checkmark when checked */
.filter__option input:checked ~ .checkmark::after {
  display: block;
}

.warning {
  color: red;
}
</style>
