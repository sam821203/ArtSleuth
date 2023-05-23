<template>
  <!-- 在痊癒可以不要加幣和標籤，加 '/' 即可。在 DOM 模板中，就必須使用閉合標籤 -->
  <TheHeader />
  <RouterView />
</template>
<script>
import TheHeader from './components/layout/TheHeader.vue';

export default {
  components: {
    TheHeader,
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
</style>
