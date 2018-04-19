<template src="./index.html"></template>

<script>
import { mapState } from 'vuex';
import passwordInput from '@components/password-input';
import { clone } from '@utils/clone';
export default {
  components: { passwordInput },
  data() {
    return {
      user: clone(this.$store.state.user) || { email: {} }
    };
  }
};
</script>

<style lang="css">

</style>
