<template ></template>

<script>
import { AuthApi } from '@services/api';
import LS from '@utils/local-storage';
export default {
  created() {
    AuthApi.logout().finally(() => this.clearFront());
  },
  methods: {
    clearFront() {
      LS.clear();
      delete Vue.http.headers.common['X-API-TOKEN'];
      this.$store.commit('SET_USER', null);
      this.$router.push({ name: 'login' });
    }
  }
};
</script>
