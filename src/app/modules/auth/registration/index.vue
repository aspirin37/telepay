<script>
import template from './index.html';

import { AuthService, UserApi } from '@services/api';
import LS from '@utils/local_storage';
import loginInput from '@components/login-input';
import { clone } from '@utils/clone';

export default Vue.extend( {
  components: {
    loginInput
  },
  data() {
    return {
      user: {
        login: this.$route.params.login || ''
      },
    }
  },
  methods: {
    register() {
      this.$parent.loading = true;
      let cloned = clone(this.user);
      AuthService.register(cloned).then(res => {
        if(res && res.token) {
          Vue.http.headers.common['X-API-TOKEN'] = res.token;
          LS.set('auth_key', res.token);
          return UserApi.getUser();
        }
        return null;
      }).then(res => {
        if(res) {
          if(res.email.address)
            LS.set('user_login', res.email.address);
          else if(res.phone.number)
            LS.set('user_login', res.phone.number);
          this.$parent.loading = false;
          this.$router.push({ name: 'dashboard' });
        }
      }).catch(err => this.$parent.loading = false);
    }
  },
  template
} );
</script>
