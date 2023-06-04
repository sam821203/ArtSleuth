<template>
  <base-card>
    <h2>Find Your Artist</h2>
    <div class="filter__options">
      <div class="filter-option">
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
      <div class="filter-option">
        <label for="unique">
          Unique
          <input id="unique" type="checkbox" checked @change="setFilters" />
          <span class="checkmark"></span>
        </label>
      </div>
      <div class="filter-option">
        <label for="painting">
          Painting
          <input id="painting" type="checkbox" checked @change="setFilters" />
          <span class="checkmark"></span>
        </label>
      </div>
      <div class="filter-option">
        <label for="sculpture">
          Sculpture
          <input id="sculpture" type="checkbox" checked @change="setFilters" />
          <span class="checkmark"></span>
        </label>
      </div>
      <div class="filter-option">
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

.filter-option {
  position: relative;
  display: block;
  margin-right: 1rem;
  cursor: pointer;
  user-select: none;
}

.filter-option input {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  vertical-align: middle;
  cursor: pointer;
}

.filter-option label {
  margin-left: 1.85rem;
  cursor: pointer;
}

.filter-option.active label {
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

.filter-option:hover input ~ .checkmark {
  background-color: transparent;
}

.filter-option input:checked ~ .checkmark {
  border: 1px solid #c7b8f8;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark::after {
  content: "";
  position: absolute;
  display: none;
}

/* Style the checkmark/indicator */
.filter-option .checkmark::after {
  top: 3.8px;
  left: 7.4px;
  width: 7.4px;
  height: 12px;
  border: solid #c7b8f8;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}

/* Show the checkmark when checked */
.filter-option input:checked ~ .checkmark::after {
  display: block;
}

.card {
  margin-bottom: 0;
}
</style>
