import { createApp } from 'vue';

import App from './App.vue';

import router from './router.js';
import store from './store/index.js';

// UI components
import BaseCard from './components/UI/BaseCard.vue';
import BaseButton from './components/UI/BaseButton.vue';
import BaseBadge from './components/UI/BaseBadge.vue';
import BaseSpinner from './components/UI/BaseSpinner.vue';
import BaseDialog from './components/UI/BaseDialog.vue';

const app = createApp(App);

app.use(router);
app.use(store);

// UI components
app.component('BaseCard', BaseCard);
app.component('BaseButton', BaseButton);
app.component('BaseBadge', BaseBadge);
app.component('BaseSpinner', BaseSpinner);
app.component('BaseDialog', BaseDialog);

app.mount('#app');
