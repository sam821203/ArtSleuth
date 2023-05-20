import { createRouter, createWebHistory } from 'vue-router';

import ArtistsDetail from './pages/artists/ArtistsDetail.vue';
import ArtistsList from './pages/artists/ArtistsList.vue';
import ArtistsRegistration from './pages/artists/ArtistsRegistration.vue';

import ContactArtist from './pages/messages/ContactArtist.vue';
import MessagesReceive from './pages/messages/MessagesReceive.vue';

import NotFound from './pages/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/artists' },
    { path: '/artists', component: ArtistsList },
    {
      path: '/artists/:id', component: ArtistsDetail, children: [
        { path: 'contact', component: ContactArtist }
      ]
    },
    { path: '/register', component: ArtistsRegistration },
    { path: '/messages', component: MessagesReceive },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

export default router;