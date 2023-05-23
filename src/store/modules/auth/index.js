import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  state() {
    return {
      // 確認是誰正在使用此 App
      token: null,
      userId: null,
      tokenExpiration: null,
    };
  },
  mutations,
  actions,
  getters,
};
