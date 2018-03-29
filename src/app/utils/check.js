import { UserApi } from '@services/api';
import LS from '@utils/local_storage';



export function routerAuthHandle(app, to, from, next) {
  app.$store.commit('TOGGLE_LOADING', true);
  let auth_key = LS.get('auth_key');
  if(!app.$store.state.user && !auth_key) {
    if(to.meta.auth) {
      app.$notifystr.danger('access denied');
      if(app.$route.name !== 'login') {
        app.$router.replace({ name: 'login' });
        next();
      }
    } else {
      next();
    }
    app.$store.commit('TOGGLE_LOADING', false);
  } else if (auth_key && !app.$store.state.user) {
    getUser(app, auth_key, next);
  } else {
    next();
    app.$store.commit('TOGGLE_LOADING', false);
  }
}

export function mountAuthHandle(app, to) {
  app.$store.commit('TOGGLE_LOADING', true);
  let auth_key = LS.get('auth_key');
  if(!app.$store.state.user && !auth_key) {
    if(to.meta.auth) {
      app.$router.replace({ name: 'login' });
    }
    app.$store.commit('TOGGLE_LOADING', false);
  } else if (auth_key && !app.$store.state.user) {
    getUser(app, auth_key);
  } else {
    next();
    app.$store.commit('TOGGLE_LOADING', false);
  }
}

function getUser(app, auth_key, next = null) {
  Vue.http.headers.common['X-API-TOKEN'] = auth_key;
  return UserApi.getUser().then(res => {
    console.log(res);
    app.$store.commit('SET_USER', res);
    app.$store.commit('TOGGLE_LOADING', false);
    if(next) next();
  }).catch((err) => {
    if(err && err.status === 403) {
      app.$router.replace({ name: 'login' });
      LS.clear();
    }
  })
}
