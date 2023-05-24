import { createRouter, createWebHistory } from 'vue-router';

import ArtistsDetail from './pages/artists/ArtistsDetail.vue';
import ArtistsList from './pages/artists/ArtistsList.vue';
import ArtistsRegistration from './pages/artists/ArtistsRegistration.vue';

import ContactArtist from './pages/requests/ContactArtist.vue';
import RequestsReceive from './pages/requests/RequestsReceive.vue';

import UserAuth from './pages/auth/UserAuth.vue';
import NotFound from './pages/NotFound.vue';

import store from './store/index.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/artists' },
    { path: '/artists', component: ArtistsList },
    {
      path: '/artists/:id',
      component: ArtistsDetail,
      props: true,
      children: [
        { path: 'contact', component: ContactArtist },
      ],
    },
    { path: '/register', component: ArtistsRegistration, meta: { requiresAuth: true } },
    { path: '/requests', component: RequestsReceive, meta: { requiresAuth: true } },
    { path: '/auth', component: UserAuth, meta: { requiresUnAuth: true } },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnAuth && store.getters.isAuthenticated) {
    next('/artists');
  } else {
    next();
  }
});

export default router;
