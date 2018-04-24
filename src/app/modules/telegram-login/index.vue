<template>
    <div></div>
</template>
<script>
import LS from '@utils/local-storage';
export default Vue.extend({
  data() {
    return {};
  },
  created() {
    if (this.$route.query && this.$route.query.t) {
      LS.set('auth_key', this.$route.query.t);
      console.log(this.$route.query.t);
      document.location = '/catalog';
    }
  },
  methods: {}
});
</script>
