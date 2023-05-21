<template>
  <section>
    <base-card>
      <header>
        <h2>Messages Received</h2>
      </header>
      <ul v-if="hasMessages">
        <messages-item
          v-for="msg in receivedMessages"
          :key="msg.id"
          :email="msg.userEmail"
          :message="msg.userMessage"
        ></messages-item>
      </ul>
      <h3 v-else>You haven't received any messages yet!</h3>
    </base-card>
  </section>
</template>

<script>
import MessagesItem from "../../components/messages/messagesItem.vue";

export default {
  components: {
    MessagesItem,
  },
  computed: {
    receivedMessages() {
      // namespaced / getters
      return this.$store.getters["messages/messages"];
    },
    hasMessages() {
      return this.$store.getters["messages/hasMessages"];
    },
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
