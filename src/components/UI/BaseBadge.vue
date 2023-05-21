<template>
  <span class="badge" :class="type">
    {{ badgeTitle }}
  </span>
</template>

<script>
export default {
  props: ["type", "title"],
  computed: {
    badgeTitle() {
      return this.title.toLowerCase();
    },
  },
};
</script>

<style scoped>
.badge {
  background-color: #ccc;
  color: #252525;
  border-radius: 4px;
  padding: 0.43rem 0.8rem 0.4rem;
  display: inline-block;
  margin-right: 0.4rem;
}

.frontend {
  background-color: #3d008d;
  color: white;
}

.backend {
  background-color: #71008d;
  color: white;
}

.career {
  background-color: #8d006e;
  color: white;
}
</style>
