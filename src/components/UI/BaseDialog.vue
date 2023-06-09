<template>
  <teleport to="body">
    <div v-if="show" class="backdrop" @click="tryClose" />
    <transition name="dialog">
      <dialog v-if="show" open>
        <header>
          <slot name="header">
            <h2>{{ title }}</h2>
          </slot>
        </header>
        <section>
          <slot />
        </section>
        <menu v-if="!fixed">
          <slot name="actions">
            <base-button mode="emphasis" @click="tryClose"> Close </base-button>
          </slot>
        </menu>
      </dialog>
    </transition>
  </teleport>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false,
      default: "title",
    },
    fixed: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ["close"],
  setup(props, context) {
    const tryClose = () => {
      if (props.fixed) {
        return;
      }
      context.emit("close");
    };

    return {
      tryClose,
    };
  },
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.75);
}

dialog {
  position: fixed;
  top: 20vh;
  left: 10%;
  z-index: 100;
  padding: 0;
  margin: 0;
  width: 80%;
  background-color: white;
  border: none;
  border-radius: 0.25rem;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}

header {
  padding: 1rem;
  width: 100%;
  color: white;
  background-color: var(--primary);
}

header h2 {
  margin: 0;
}

section {
  padding: 1rem;
}

menu {
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
  margin: 0;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.dialog-enter-active {
  transition: all 0.3s ease-out;
}

.dialog-leave-active {
  transition: all 0.3s ease-in;
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}

@media (width >= 768px) {
  dialog {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}
</style>
