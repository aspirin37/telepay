<template>
  <div></div>
</template>
<script>
import { UserApi } from '@services/api';
import LS from '@utils/local-storage';
export default Vue.extend({
  data() {
    return {};
  },
  created() {
    if (this.$route.query && this.$route.query.t) {
      Vue.http.headers.common['X-API-TOKEN'] = this.$route.query.t;
      LS.set('auth_key', this.$route.query.t);
      this.getUser();
    } else {
      console.log('to login');
      // this.$router.push({ name: 'login' });
    }
  },
  methods: {
    async getUser() {
      let user = await UserApi.getUser();
      if (['user', 'admin', 'confirmed'].includes(user.roles)) {
        this.$store.commit('SET_USER', user);
        this.$router.push({ name: 'catalog' });
      } else {
        this.$notifystr.danger('Ошибка входа!', 'Профиль не является профилем пользователя');
        this.$store.commit('SET_USER', null);
        LS.clear();
      }
    }
  }
});
</script>
