import '../css/main.scss';

import router from './routes';
import store from './store';
import '@utils/interceptor';

// components
import notifystr from 'notifystr';
import loader from '@components/loader';
import navigation from '@components/navigation';
// services
import '@filters';

import { routerAuthHandle, mountAuthHandle } from '@utils/check';

export const App = new Vue({
    router,
    store,
    components: {
      navigation,
      loader,
      notifystr
    },
    beforeMount() {
      mountAuthHandle(this, this.$route);
      this.$router.beforeEach((to, from, next) => {
        routerAuthHandle(this, to, from, next);
      })
    },
    computed: {
      showSpinner: {
        get: function() {
          return this.$store.state.loading;
        },
        set: () => {}
      }
    }
}).$mount('#app');
