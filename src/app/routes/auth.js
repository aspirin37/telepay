import Login from '@modules/auth/login';
import Registration from '@modules/auth/registration';
import Recovery from '@modules/auth/recovery';
import NewPass from '@modules/auth/new_pass';
import Activate from '@modules/auth/activate';
import AdminEntr from '@modules/auth/admin-entr';
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
    meta: { auth: false },
    }, {
    path: 'recovery',
    name: 'recovery',
    component: Recovery,
    meta: { auth: false }
    }, {
    path: 'activate',
    name: 'activate',
    component: Activate,
    meta: { auth: false }
    }, {
    path: 'new-pass',
    name: 'new_pass',
    component: NewPass,
    meta: { auth: false }
    }, {
    path: 'admin-ent',
    name: 'admin-ent',
    component: AdminEntr,
    meta: { auth: false }
  },{
    path: 'logout',
    name: 'logout',
    component: Logout,
    meta: { auth: false }
  }]
}
