import Auth from './auth';
// import Main from '@modules/main';
import Catalog from '@modules/catalog';
import Faq from '@modules/faq';
import Profile from '@modules/profile';

import ChannelLists from './channel-lists';
import Channels from './channels';
import Posts from './posts';
import Support from './support';
import Balance from './balance';

import { BalanceApi } from '@services/api';

const PaymentForm = {
    template: `<iframe :src="src" height="${window.innerHeight-150}" width="100%" v-if="src"></iframe>`,
    data() {
        return {
            src: null,
        };
    },
    async created() {
        this.src = decodeURIComponent(await BalanceApi.getForm({ amount: 100 }));
    }
};

const routes = [
    Auth,
    Channels,
    Posts,
    Support,
    Balance,
    ChannelLists,
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
    },
    {
        path: '/payment-form',
        name: 'payment-form',
        component: PaymentForm
    },
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
