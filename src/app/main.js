import '../css/main.scss';
import './config';

import router from './routes';
import store from './store';
import '@services/interceptor';

// components
import notifystr from 'notifystr';
import loader from '@components/loader';
import navigation from '@components/navigation';
// services
import '@filters';

import check from '@services/check-user';

export const App = new Vue( {
    router,
    store,
    components: {
        navigation,
        loader,
        notifystr,
    },
    beforeMount() {
        check( this );
    },
    computed: {
        showSpinner: {
            get: function () {
                return this.$store.state.loading;
            },
            set: () => {},
        },
    },
} ).$mount( '#app' );