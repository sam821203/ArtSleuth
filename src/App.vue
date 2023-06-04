<template>
  <!-- 在痊癒可以不要加幣和標籤，加 '/' 即可。在 DOM 模板中，就必須使用閉合標籤 -->
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
  /* --primary: Aquamarine; */
  --primary-deep-gray: rgb(31, 31, 31);
  --primary-light-gray: #eee;
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

input[type="checkbox"] {
  display: grid;
  margin: 0;
  width: 1.15em;
  height: 1.15em;
  color: currentcolor;
  background-color: #fff;
  border: 0.15em solid #000;
  border-radius: 0.15em;
  appearance: none;
  place-content: center;

  /* font: inherit;
  transform: translateY(-0.075em); */
}

input[type="checkbox"]::before {
  width: 0.65em;
  height: 0.65em;
  box-shadow: inset 1em 1em #000;
  transition: 120ms transform ease-in-out;
  content: "";
  transform: scale(0);
  transform-origin: bottom left;
  clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
}

input[type="checkbox"]:checked::before {
  transform: scale(1);
}
</style>
