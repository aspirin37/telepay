import WebStorage from '@utils/storage';
import { UserApi } from '@services/api';

async function checkUserAvailable( App ) {
    let auth_key = WebStorage.get( 'auth_key' );
    let isAuth = window.location.pathname.includes( 'auth/' );
    if ( !auth_key && !isAuth ) {
        // нет токена
        App.$router.replace( { name: 'login' } );
    } else if ( auth_key ) {
        Vue.http.headers.common[ 'X-API-TOKEN' ] = auth_key;
        let user = await UserApi.getUser()
            .catch( ( err ) => {
                if ( err.status === 401 ) {
                    App.$router.push( { name: 'logout' } );
                    App.$notifystr.danger( 'Ошибка доступа!', 'Токен авторизации устарел!' );
                }
            } );

        if ( user && user.userId ) {
            let tg_id = WebStorage.get( 'tg_id' );
            if ( tg_id ) {
                await UserApi.update( { telegram_id: tg_id } );
                WebStorage.rm( 'tg_id' );
                App.$router.replace( { name: App.$route.name, query: {} } );
            }
            App.$store.commit( 'SET_USER', user );
            if ( isAuth ) {
                App.$router.replace( { name: 'catalog' } );
            }
        }
    }
}

export default checkUserAvailable;
