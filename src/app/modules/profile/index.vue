<template src="./index.html"></template>

<script>
import { mapState } from 'vuex';
import passwordInput from '@components/password-input';
import { UserApi } from '@services/api';
import { clone } from '@utils/clone';
import LS from '@utils/local-storage';

export default {
  components: { passwordInput },
  data() {
    return {
      user: clone(this.$store.state.user) || { email: {} },
      auth_key: LS.get('auth_key'),
      fetchTimeout: null
    };
  },
  methods: {
    startFetchingUser() {
      clearTimeout(this.fetchTimeout);
      if (this.user.telegram_id !== this.$store.state.user.telegram_id) {
        this.user = clone(this.$store.state.user);
      } else {
        this.getUser();
        this.fetchTimeout = setTimeout(this.getUser, 3000);
      }
    },
    async getUser() {
      let user = await UserApi.getUser();
      this.$store.commit('SET_USER', user);
    }
  }
};
</script>

