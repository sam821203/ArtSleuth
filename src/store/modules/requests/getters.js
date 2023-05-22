export default {
  requests(state, _, _2, rootGetters) {
    const artistId = rootGetters.userId;
    return state.requests.filter(msg => msg.artistId === artistId);
  },
  hasRequests(_, getters) {
    // getters.requests 就是取得上面的 requests
    return getters.requests && getters.requests.length > 0;
  }
};