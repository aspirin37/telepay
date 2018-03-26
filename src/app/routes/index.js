import store from '@store';

import Auth from './auth';
import Main from '@modules/main';
import Catalog from '@modules/catalog';
import Faq from '@modules/faq';
import Profile from '@modules/profile';
import Favs from '@modules/favs';

import Channels from './channels';
import Posts from './posts';
import Support from './support';

const routes = [
  Auth,
  Channels,
  Posts,
  Support,
    {
        path: '/',
        name: 'main',
        component: Main,
        meta: { auth: false }
  },
    {
        path: '/catalog',
        name: 'catalog',
        component: Catalog,
        meta: { auth: false }
  },
    {
        path: '/faq',
        name: 'faq',
        component: Faq,
        meta: { auth: false }
  },
    {
        path: '/profile',
        name: 'profile',
        component: Profile,
        meta: { auth: true }
  },
    {
        path: '/favs',
        name: 'favs',
        component: Favs,
        meta: { auth: true }
  },
    {
        path: '*',
        redirect: '/',
        name: '404'
  }
];

import VueRouter from 'vue-router';
Vue.use(VueRouter);

const router = new VueRouter({
    routes,
    mode: 'history',
    linkActiveClass: 'active'
});

export default router;