import { App } from '../main';
// import WebStorage from '@utils/storage';
import loaderBlacklist from '@utils/loader-blacklist';
import notifystrBlacklist from '@utils/notifystr-blacklist';
import notifystrErrorsBlacklist from '@utils/notifystr-errors-blacklist';

// response handler
Vue.http.interceptors.push( ( request, next ) => {
    if ( App && !loaderBlacklist.find( el => new RegExp( el ).test( request.url ) ) ) {
        App.$store.commit( 'TOGGLE_LOADING', true );
    }
    next( response => {
        if ( App && !loaderBlacklist.find( el => new RegExp( el ).test( request.url ) ) ) App.$store.commit( 'TOGGLE_LOADING', false );
        if ( response.ok ) {
            if ( request.method !== 'GET' && !notifystrBlacklist.find( el => new RegExp( el ).test( response.url ) ) ) {
                App.$notifystr.success( 'Успешно!', response.data.message || '' );
            }
        } else {
            if ( response && response.data && typeof response.data === 'object' ) {
                if ( response.status === 401 || response.status === 403 ) {
                    App.$router.push( { name: 'logout' } );
                } else {
                    for ( let err in response.data ) {
                        if ( !notifystrErrorsBlacklist.find( el => new RegExp( el ).test( response.url ) ) ) {
                            App.$notifystr.danger( 'Ошибка!', response.data[ err ] );
                        }
                    }
                }
            } else if ( response && response.data && typeof response.data === 'string' && response.status !== 500 ) {
                App.$notifystr.danger( 'Ошибка!', response.data );
            }
            if ( response.status === 500 ) {
                App.$notifystr.danger( 'Критическая ошибка сервера!', 'Обратитесь в службу поддержки!' );
            }
        }
    } );
} );
