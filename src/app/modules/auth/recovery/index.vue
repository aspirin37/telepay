<script>
import template from './index.html';
import { UserApi } from '@services/api';
import loginInput from '@components/login-input';

export default Vue.extend( {
  components: {
    loginInput
  },
  data() {
    return {
      login: this.$route.params.login || ''
    }
  },
  methods: {
    recover() {
      this.$parent.loading = true;
      UserApi.requestResetPass({ login: this.login }).then(res => {
        this.$parent.loading = false;
        if(/\+7\d{10}/.test(this.login)) {
          this.$router.push({ name: 'new_pass', query: { phone: this.login } });
        }
      }).catch(err => this.$parent.loading = false);
    }
  },
  template
});
</script>
