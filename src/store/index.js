import { createStore } from 'vuex';

import artistsModules from './modules/artists/index.js';
import messagesModules from './modules/messages/index.js';

const store = createStore({
  modules: {
    artists: artistsModules,
    messages: messagesModules,
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