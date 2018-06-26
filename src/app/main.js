import '../css/main.scss';
import './config';

import router from './routes';
import store from './store';
import { mapGetters } from 'vuex';
import VueMq from 'vue-mq';

import '@services/interceptor';
import WebStorage from '@utils/storage';
// components
import notifystr from 'notifystr';
import loader from '@components/loader';
import navigation from '@components/navigation';
import pageFooter from '@components/footer';

Vue.config.productionTip = process.env.NODE_ENV === 'production';

Vue.use(VueMq, {
    breakpoints: {
        sm: 768,
        md: Infinity,
    }
});

// services
import '@filters';
// directives
import tooltip from '@components/tooltip';
Vue.directive('tooltip', tooltip);

import check from '@services/check-user';

export const App = new Vue({
    router,
    store,
    components: {
        navigation,
        pageFooter,
        loader,
        notifystr
    },
    async beforeMount() {
        this.applyMetrika();
        if(this.$route.query.tg) WebStorage.set('tg_id', this.$route.query.tg);
        await check(this);
    },
    computed: {
        showSpinner: {
            get: function() {
                return this.$store.state.loading;
            },
            set: () => {},
        },
        ...mapGetters({
            isMenuOpened: 'getMenuState'
        }),
    },
    methods: {
        applyMetrika() {
            // launch metrika only on production
            if(process.env.NODE_ENV === 'production' && process.env.url !== 'dev') {
                (function(d, w, c) {
                    (w[c] = w[c] || []).push(function() {
                        try {
                            w.yaCounter48703889 = new window.Ya.Metrika({
                                id: 48703889,
                                clickmap: true,
                                trackLinks: true,
                                accurateTrackBounce: true,
                                webvisor: true
                            });
                        } catch(e) {
                            // eslint-disable-next-line no-console
                            console.error('Cannot apply Yandex Metrika');
                        }
                    });

                    var n = d.getElementsByTagName('script')[0],
                        s = d.createElement('script'),
                        f = function() { n.parentNode.insertBefore(s, n); };
                    s.type = 'text/javascript';
                    s.async = true;
                    s.src = 'https://mc.yandex.ru/metrika/watch.js';

                    if(w.opera == '[object Opera]') {
                        d.addEventListener('DOMContentLoaded', f, false);
                    } else { f(); }
                })(document, window, 'yandex_metrika_callbacks');
            }
        }
    }
}).$mount('#app');
