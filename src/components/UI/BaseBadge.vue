<template>
  <span class="badge" :class="type">
    {{ badgeTitle }}
  </span>
</template>

<script>
import { computed } from "vue";

export default {
  props: ["type", "title"],
  setup(props) {
    const badgeTitle = computed(() => props.title.toLowerCase());

    return {
      badgeTitle,
    };
  },
};
</script>

<style scoped>
.badge {
  display: inline-block;
  padding: 0.43rem 0.8rem 0.4rem;
  margin-right: 0.4rem;
  font-size: 0.75rem;
  color: #252525;
  background-color: #ccc;
  border-radius: 4px;
  letter-spacing: 0.3px;
}

.limitedEdition {
  color: #927bdb;
  background-color: rgba(199, 184, 248, 0.5);
}

.unique {
  color: #ef85cd;
  background-color: rgba(255, 193, 235, 0.35);
}

.painting,
.sculpture,
.prints {
  color: #f2a51f;
  background-color: rgba(255, 187, 69, 0.25);
}
</style>
