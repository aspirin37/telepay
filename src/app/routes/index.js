import Auth from './auth';
import Main from '@modules/main';
import Catalog from '@modules/catalog';
import Support from '@modules/support';
import Faq from '@modules/faq';
import Profile from '@modules/profile';
import Favs from '@modules/favs';

import Channels from './channels';
import Projects from './projects';

const routes = [
  Auth,
  Channels,
  Projects,
  {
    path: '/',
    name: 'main',
    component: Main,
  },
  {
    path: '/catalog',
    name: 'catalog',
    component: Catalog,
  },
  {
    path: '/support',
    name: 'support',
    component: Support,
  },
  {
    path: '/faq',
    name: 'faq',
    component: Faq,
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
  },
  {
    path: '/favs',
    name: 'favs',
    component: Favs,
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
