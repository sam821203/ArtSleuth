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
