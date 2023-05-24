import { createRouter, createWebHistory } from 'vue-router';

import ArtistsList from './pages/artists/ArtistsList.vue';
import store from './store/index.js';

const ArtistsDetail = () => import('./pages/artists/ArtistsDetail.vue');
const ArtistsRegistration = () => import('./pages/artists/ArtistsRegistration.vue');
const ContactArtist = () => import('./pages/requests/ContactArtist.vue');
const RequestsReceive = () => import('./pages/requests/RequestsReceive.vue');

const UserAuth = () => import('./pages/auth/UserAuth.vue');
const NotFound = () => import('./pages/NotFound.vue');

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
