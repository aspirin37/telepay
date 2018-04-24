import Auth from './auth';
// import Main from '@modules/main';
import Catalog from '@modules/catalog';
import Faq from '@modules/faq';
import Profile from '@modules/profile';
import TelegramLogin from '@modules/telegram-login';
// import Favs from '@modules/favs';

import Channels from './channels';
import Posts from './posts';
import Support from './support';
import Balance from './balance';

const routes = [
    Auth,
    Channels,
    Posts,
    Support,
    Balance,
    //   {
    //       path: '/',
    //       name: 'main',
    //       component: Main,
    // },
    {
        path: '/catalog',
        name: 'catalog',
        component: Catalog,
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
    },{
        path: '/telegram-login',
        name: 'telegram-login',
        component: TelegramLogin,
    },
    //   {
    //       path: '/favs',
    //       name: 'favs',
    //       component: Favs,
    // },
    {
        path: '*',
        redirect: '/catalog',
        name: '404',
    },
];

import VueRouter from 'vue-router';
Vue.use(VueRouter);

const router = new VueRouter({
    routes,
    mode: 'history',
    linkActiveClass: 'active',
});

export default router;