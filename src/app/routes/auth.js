import Login from '@modules/auth/login';
import Registration from '@modules/auth/registration';
import Recovery from '@modules/auth/recovery';
import AuthLayout from '@modules/auth/layout';
import Logout from '@modules/auth/logout';

export default {
  path: '/auth',
  name: 'auth',
  component: AuthLayout,
  meta: { auth: false },
  redirect: '/auth/login',
  children: [{
    path: 'login',
    name: 'login',
    component: Login,
    meta: { auth: false }
    }, {
    path: 'registration',
    name: 'registration',
    component: Registration,
    meta: { auth: false }
    }, {
    path: 'recovery',
    name: 'recovery',
    component: Recovery,
    meta: { auth: false }
    }, {
    path: 'logout',
    name: 'logout',
    component: Logout,
    meta: { auth: false }
  }]
}
