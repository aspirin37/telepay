import {App} from '../main';
import {AuthService} from '@services/api';

// response handler
Vue.http.interceptors.push((request, next) => {
  if (App) App.$store.commit('TOGGLE_LOADING', true);
  next((response) => {
    if (App) App.$store.commit('TOGGLE_LOADING', false);
    if (response.ok) {
      if (request.method !== 'GET') {
        App.$notifystr.success('Успешно!', response.data.message || '');
      }
    } else {
      if (response && response.data && typeof response.data === 'object') {
        if (response.status === 401) {
          App.$router.push({name: 'login'});
        } else if ((response.status !== 404)) {
          for (let err in response.data) {
            App.$notifystr.danger('Ошибка!', response.data[err]);
          }
        } else {
          for (let err in response.data) {
            App.$notifystr.danger('Ошибка!', response.data[err]);
          }
        }
      } else if (response && response.data && typeof response.data === 'string' && response.status !== 500) {
        App.$notifystr.danger('Ошибка!', response.data);
      }
      if (response.status === 500) {
        App.$notifystr.danger(
          'Критическая ошибка сервера!',
          'Обратитесь в службу поддержки!'
        );
      }
    }
  });
});
