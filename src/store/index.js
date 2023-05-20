import { createStore } from 'vuex';

import artistsModules from './modules/artists/index.js';
import messagesModules from './modules/messages/index.js';

const store = createStore({
  modules: {
    artists: artistsModules,
    messages: messagesModules,
  }
});

export default store;