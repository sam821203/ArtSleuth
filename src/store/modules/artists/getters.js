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
  },
  shouldUpdate(state) {
    const lastFetch = state.lastFetch;
    const currentTimestamp = new Date().getTime();

    // 第一次是預設的 null，第二次後會檢查時間戳的時間是否相等
    if (!lastFetch) {
      return true;
    }

    // 比較目前時間戳和上次時間戳，如果大於一分鐘(60秒)前，就更新
    return (currentTimestamp - lastFetch) / 1000 > 60;
  }
};