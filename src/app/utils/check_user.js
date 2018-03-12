import LS from '@utils/local_storage';
import { UserApi } from '@services/api';
import { App } from '../main';

export default function checkUserAvailable(App) {
  let auth_key = LS.get('auth_key');
  let isAuth = window.location.pathname.includes('auth/');
  if (!App.$store.user && !auth_key && !isAuth) {
    // не авторизован
    // App.$router.replace({ name: 'login' });
  } else if (auth_key) {
    // авторизован и обновил страницу
    Vue.http.headers.common['X-API-TOKEN'] = auth_key;
    App.$store.commit('TOGGLE_LOADING', true);
    UserApi.getUser()
      .then(res => {
        if(res) {
          App.$store.commit('SET_USER', res);
          App.$store.commit('TOGGLE_LOADING', false);
          if(res.roles !== 'admin' && App.$route.path.includes('admin')) {
            App.$router.replace('/catalog');
          }
        }
      })
      .catch((err) => {
        if (err && err.status === 403) {
          App.$router.replace({ name: 'login' });
          LS.clear();
        }
      })
    }
}
