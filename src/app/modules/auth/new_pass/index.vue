<script>
import template from './index.html';
import { UserApi } from '@services/api';

export default Vue.extend( {
  data() {
    return {
      reset: {
        phone: this.$route.query.phone || null,
        password: '',
        code: this.$route.query.code || '',
      }
    }
  },
  methods: {
    resetPass() {
      if(!this.reset.phone) delete this.reset.phone;
      if(this.$route.query.code) {
        UserApi.resetPassByMail(this.reset).then(() => {
          this.$router.push({ name: 'login' });
        }).catch(err => console.log(err));
      } else {
        UserApi.resetPassByPhone(this.reset).then(() => {
          this.$router.push({ name: 'login', params: { login: this.reset.phone } });
        }).catch(err => console.log(err));
      }
    }
  },
  template
});
</script>
