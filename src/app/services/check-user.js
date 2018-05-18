import WebStorage from '@utils/storage';
import { UserApi, AuthApi } from '@services/api';

async function checkUserAvailable(App) {
    let auth_key = WebStorage.get('auth_key');
    let isAuth = window.location.pathname.includes('auth/');
    if(!auth_key && !isAuth) {
        // нет токена
        App.$router.replace({ name: 'login' });
    } else if(auth_key) {
        Vue.http.headers.common['X-API-TOKEN'] = auth_key;
        let user = await UserApi.getUser()
            .catch((err) => {
                if(err.status === 401) {
                    App.$router.push({ name: 'logout' })
                    App.$notifystr.danger('Ошибка доступа!', 'Токен авторизации устарел!');
                }
            });

        if(user && user.userId) {
            App.$store.commit('SET_USER', user);
            if(isAuth) {
                App.$router.replace({ name: 'catalog' })
            }
        }
    }
}

export default checkUserAvailable;
