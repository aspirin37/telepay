import Auth from './auth';
// import Main from '@modules/main';
import Catalog from '@modules/catalog';
import Faq from '@modules/faq';
import Profile from '@modules/profile';
import Finances from '@modules/finances';
// import NotificationSettings from '@modules/notification-settings';

import ChannelLists from './channel-lists';
import Channels from './channels';
import Posts from './posts';
import Support from './support';


const routes = [
    Auth,
    Channels,
    Posts,
    Support,
    ChannelLists,
    //   {
    //       path: '/',
    //       name: 'main',
    //       component: Main,
    // },
    {
        path: '/finances',
        name: 'finances',
        component: Finances,
    },
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
    },
    // {
    //     path: '/notification-settings',
    //     name: 'notification-settings',
    //     component: NotificationSettings,
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
