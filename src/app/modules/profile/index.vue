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
      fetchedUser: null,
      fetchTimeout: null
    };
  },
  computed: {
    user: {
      get() {
        return this.$store.state.user;
      },
      set(val) {
        this.$store.commit('SET_USER', user);
      }
    }
  },
  methods: {
    startFetchingUser() {
      clearTimeout(this.fetchTimeout);
      console.log(this.fetchedUser, this.user);
      if (!this.fetchedUser || this.user.telegramId === this.fetchedUser.telegramId) {
        this.getUser();
        this.fetchTimeout = setTimeout(this.startFetchingUser, 1500);
      } else {
        this.$store.commit('SET_USER', this.fetchedUser);
      }
    },
    async getUser() {
      this.fetchedUser = await UserApi.getUser();
    }
  }
};
</script>

