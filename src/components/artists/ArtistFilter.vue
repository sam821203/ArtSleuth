<template>
  <base-card>
    <h2>Find Your Artist</h2>
    <div class="filter__options">
      <div class="filter__option">
        <label for="limitedEdition">
          Limited-edition
          <input
            id="limitedEdition"
            type="checkbox"
            checked
            @change="setFilters"
          />
          <span class="checkmark"></span>
        </label>
      </div>
      <div class="filter__option">
        <label for="unique">
          Unique
          <input id="unique" type="checkbox" checked @change="setFilters" />
          <span class="checkmark"></span>
        </label>
      </div>
      <div class="filter__option">
        <label for="painting">
          Painting
          <input id="painting" type="checkbox" checked @change="setFilters" />
          <span class="checkmark"></span>
        </label>
      </div>
      <div class="filter__option">
        <label for="sculpture">
          Sculpture
          <input id="sculpture" type="checkbox" checked @change="setFilters" />
          <span class="checkmark"></span>
        </label>
      </div>
      <div class="filter__option">
        <label for="prints">
          Prints
          <input id="prints" type="checkbox" checked @change="setFilters" />
          <span class="checkmark"></span>
        </label>
      </div>
    </div>
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
      limitedEdition: true,
      unique: true,
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
  margin: 1rem 0;
}

.filter__options {
  display: flex;
}

.card {
  padding-bottom: 0;
  margin-bottom: 0;
}
</style>
