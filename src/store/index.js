import { createStore } from 'vuex';

import artistsModules from './modules/artists/index.js';
import requestsModules from './modules/requests/index.js';
import authModules from './modules/auth/index.js';

const store = createStore({
  modules: {
    artists: artistsModules,
    requests: requestsModules,
    auth: authModules,
  },
});

export default store;
