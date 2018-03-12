<template lang="html"></template>

<script>
import LS from '@utils/local_storage';
export default {
  created() {
    LS.clear();
    this.$store.commit('SET_USER', null);
    this.$router.push({ name: 'login' });
  }
}
</script>
