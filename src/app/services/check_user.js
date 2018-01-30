import LS from '@utils/local_storage';
import { UserApi } from './api';

export default function checkUserAvailable(App) {
  let auth_key = LS.get('auth_key');
  let isAuth = window.location.pathname.includes('auth/');

  if (!auth_key && !isAuth) {
      // не авторизован
      App.$router.replace('/');
  } else if (auth_key) {
      // авторизован и обновил страницу
      Vue.http.headers.common['X-API-TOKEN'] = auth_key;

      UserApi
        .getUser()
        .then(res => {
          if(res.roles !== 'admin' && App.$route.path.includes('admin')) {
            App.$router.replace('/catalog');
          }
        })
        .catch((err) => {
          if (err && err.status === 403) {
            App.$router.replace('/');
            LS.clear();
          }
        })
    }
}
