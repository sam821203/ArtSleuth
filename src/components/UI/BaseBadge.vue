<template>
  <span class="badge" :class="type">
    {{ badgeTitle }}
  </span>
</template>

<script>
export default {
  props: ['type', 'title'],
  computed: {
    badgeTitle() {
      return this.title.toLowerCase();
    },
  },
};
</script>

<style scoped>
.badge {
  display: inline-block;
  padding: 0.43rem 0.8rem 0.4rem;
  margin-right: 0.4rem;
  color: #252525;
  background-color: #ccc;
  border-radius: 4px;
}

.frontend {
  color: white;
  background-color: #3d008d;
}

.backend {
  color: white;
  background-color: #71008d;
}

.career {
  color: white;
  background-color: #8d006e;
}
</style>
