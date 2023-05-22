import { createStore } from 'vuex';

import artistsModules from './modules/artists/index.js';
import requestsModules from './modules/requests/index.js';

const store = createStore({
  modules: {
    artists: artistsModules,
    requests: requestsModules,
  },
  state() {
    return {
      // 確認是誰正在使用此 App
      userId: 'a3'
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    }
  }
});

export default store;