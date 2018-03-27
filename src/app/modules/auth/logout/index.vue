<template lang="html"></template>

<script>
import { AuthService } from '@services/api';
import LS from '@utils/local_storage';
export default {
  created() {
    AuthService.logout().finally(() => this.clearFront());
  },
  methods: {
    clearFront() {
      LS.clear();
      delete Vue.http.headers.common['X-API-TOKEN'];
      this.$store.commit('SET_USER', null);
      this.$router.push({ name: 'login' });
    }
  }
}
</script>
