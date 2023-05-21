export default {
  messages(state, _, _2, rootGetters) {
    const artistId = rootGetters.userId;
    console.log(state.messages);
    return state.messages.filter(msg => msg.artistId === artistId);
  },
  hasMessages(_, getters) {
    // getters.messages 就是取得上面的 messages
    return getters.messages && getters.messages.length > 0;
  }
};