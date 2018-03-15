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
          if(res.roles === 'user' || res.roles === 'confirmed') {
            this.$store.commit('SET_USER', res);
            this.$router.push({ name: 'catalog' });
          } else {
            this.$notifystr.danger('Ошибка входа!', 'Профиль не является профилем пользователя');
            this.$store.commit('SET_USER', null);
            LS.clear();
          }
        }
      }).catch(err => console.log(err));
    }
  },
  template
} );
</script>
