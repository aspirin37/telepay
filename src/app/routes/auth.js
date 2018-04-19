import Login from '@modules/auth/login';
import Registration from '@modules/auth/registration';
import Recovery from '@modules/auth/recovery';
import AuthLayout from '@modules/auth/layout';
import Logout from '@modules/auth/logout';

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
    }],
};