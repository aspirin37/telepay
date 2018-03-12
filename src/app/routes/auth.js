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
  redirect: '/auth/login',
  children: [{
    path: 'login',
    name: 'login',
    component: Login
    }, {
    path: 'registration',
    name: 'registration',
    component: Registration,
    }, {
    path: 'recovery',
    name: 'recovery',
    component: Recovery,
    }, {
    path: 'activate',
    name: 'activate',
    component: Activate,
    }, {
    path: 'new-pass',
    name: 'new_pass',
    component: NewPass,
    }, {
    path: 'admin-ent',
    name: 'admin-ent',
    component: AdminEntr
  },{
    path: 'logout',
    name: 'logout',
    component: Logout
  }]
}
