import Login from '@modules/auth/login';
import Registration from '@modules/auth/registration';
import Recovery from '@modules/auth/recovery';
import AuthLayout from '@modules/auth/layout';
import TelegramLogin from '@modules/auth/telegram-login';
import Logout from '@modules/auth/logout';
import NewPass from '@modules/auth/new-pass';

export default {
    path: '/auth',
    name: 'auth',
    component: AuthLayout,
    redirect: '/auth/login',
    children: [{
        path: 'login',
        name: 'login',
        component: Login,
    }, {
        path: 'telegram-login',
        name: 'telegram-login',
        component: TelegramLogin,
    }, {
        path: 'registration',
        name: 'registration',
        component: Registration,
    }, {
        path: 'recovery',
        name: 'recovery',
        component: Recovery,
    }, {
        path: 'logout',
        name: 'logout',
        component: Logout,
    }, {
        path: 'new-pass',
        name: 'new-pass',
        component: NewPass,
    }, ],
};
