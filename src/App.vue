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
import TheHeader from './components/layout/TheHeader.vue';

export default {
  components: {
    TheHeader,
  },
  computed: {
    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    },
  },
  watch: {
    didAutoLogout(curValue, oldValue) {
      if (curValue && curValue !== oldValue) {
        this.$router.replace('/artists');
      }
    },
  },
  created() {
    this.$store.dispatch('keepLogin');
  },
};
</script>

<style>
@import "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap";

* {
  box-sizing: border-box;
}

html {
  font-family: Roboto, sans-serif;
}

body {
  margin: 0;
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
  transition: all .3s ease-out;
}

.route-leave-active {
  transition: all .3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translate(0);
}

</style>
