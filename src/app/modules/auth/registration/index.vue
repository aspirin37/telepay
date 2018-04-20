<script>
import template from './index.html';

import { AuthApi, UserApi } from '@services/api';
import LS from '@utils/local-storage';
// import loginInput from '@components/login-input';
import { clone } from '@utils/clone';

export default Vue.extend({
  components: {
    // loginInput
  },
  data() {
    return {
      user: {
        login: this.$route.params.login || null,
        password: null
      },
      passCheck: null,
      validations: {
        passwordMatch: false
      }
    };
  },
  methods: {
    register(ev) {
      ev.preventDefault();

      if (this.user.password === this.passCheck) {
        let cloned = clone(this.user);
        AuthApi.register(cloned)
          .then(res => {
            if (res && res.token) {
              Vue.http.headers.common['X-API-TOKEN'] = res.token;
              LS.set('auth_key', res.token);
              return UserApi.getUser();
            }
            return null;
          })
          .then(res => {
            if (res) {
              this.$store.commit('SET_USER', res);
              this.$router.push({ name: 'catalog' });
            }
          })
          .catch(err => console.error(err));
      } else {
        this.validations.passwordMatch = true;
      }
    }
  },
  template
});
</script>
