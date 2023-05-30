<template>
  <base-card>
    <h2>Find Your Artist</h2>
    <span class="filter-option">
      <label for="painting"> Painting </label>
      <input id="painting" type="checkbox" checked @change="setFilters" />
    </span>
    <span class="filter-option">
      <label for="sculpture"> Sculpture </label>
      <input id="sculpture" type="checkbox" checked @change="setFilters" />
    </span>
    <span class="filter-option">
      <label for="prints"> Prints </label>
      <input id="prints" type="checkbox" checked @change="setFilters" />
    </span>
  </base-card>
</template>

<script>
import { reactive } from "vue";

import BaseCard from "../UI/BaseCard.vue";

export default {
  components: { BaseCard },
  emits: ["change-filters"],
  setup(_, context) {
    let filters = reactive({
      painting: true,
      sculpture: true,
      prints: true,
    });

    const setFilters = (event) => {
      const inputId = event.target.id;
      const isActive = event.target.checked;
      const updatedFilters = {
        ...filters,
        [inputId]: isActive,
      };

      filters = updatedFilters;
      context.emit("change-filters", updatedFilters);
    };

    return {
      filters,
      setFilters,
    };
  },
};

// import { reactive } from "vue";
// import BaseCard from "../UI/BaseCard.vue";

// export default {
//   components: {
//     BaseCard,
//   },
//   emits: ["change-filters"],
//   setup(_, context) {
//     const filters = reactive({
//       frontend: true,
//       backend: true,
//       career: true,
//     });
//     const setFilters = (event) => {
//       const inputId = event.target.id;
//       const isActive = event.target.checked;
//       const updatedFilters = {
//         ...filters,
//         [inputId]: isActive,
//       };

//       context.emit("change-filters", updatedFilters);
//     };

//     return {
//       filters,
//       setFilters,
//     };
//   },
// };
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
