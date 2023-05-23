import { createRouter, createWebHistory } from 'vue-router';

import ArtistsDetail from './pages/artists/ArtistsDetail.vue';
import ArtistsList from './pages/artists/ArtistsList.vue';
import ArtistsRegistration from './pages/artists/ArtistsRegistration.vue';

import ContactArtist from './pages/requests/ContactArtist.vue';
import RequestsReceive from './pages/requests/RequestsReceive.vue';

import NotFound from './pages/NotFound.vue';

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
    { path: '/register', component: ArtistsRegistration },
    { path: '/requests', component: RequestsReceive },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

export default router;
