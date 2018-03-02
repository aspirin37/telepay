<script>
import template from './index.html';

import { AuthService, UserApi } from '@services/api';
import LS from '@utils/local_storage';
import loginInput from '@components/login-input';
import { clone } from '@utils/clone';

export default Vue.extend( {
  components: { loginInput },
  data() {
    return {
      user: {
        login: this.$route.params.login || ''
      }
    }
  },
  methods: {
    login() {
      let cloned = clone(this.user);
      AuthService.login(cloned).then(res => {
        if(res && res.token) {
          Vue.http.headers.common[ 'X-API-TOKEN' ] = res.token;
          LS.set( 'auth_key', res.token );
          return UserApi.getUser()
        }
        return null;
      }).then(res => {
        if(res) {
          if(res.roles === 'admin') {
            this.$router.push({ name: 'admin' });
            LS.set( 'user_login', res.email.address );
          } else
          if(res.roles === 'user' || res.roles === 'confirmed') {
            this.$router.push({ name: 'dashboard' });
            LS.set('user_login', res.email.address);
          } else {
            this.$notifystr.danger('Ошибка входа!', 'Профиль не является профилем пользователя');
            LS.clear();
          }
        }
      }).catch(err => console.log(err));
    }
  },
  template
} );
</script>
