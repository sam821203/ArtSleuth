export default {
  getArtists(state) {
    return state.artists;
  },
  // 確認是否有資料
  hasArtists(state) {
    return state.artists && state.artists.length > 0;
  }
};