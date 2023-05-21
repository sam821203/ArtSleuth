export default {
  getArtists(state) {
    return state.artists;
  },
  // 確認是否有資料
  hasArtists(state) {
    return state.artists && state.artists.length > 0;
  },
  isArtist(state, _, _2, rootGetters) {
    const artists = state.artists;
    const userId = rootGetters.userId;
    return artists.some(artist => artist.id === userId);
  }
};