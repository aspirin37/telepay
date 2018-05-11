<template src="./index.html"></template>
<script>
import normCheckbox from '@components/checkbox';
export default Vue.extend({
  components: { normCheckbox },
  data() {
    return {
      amount: 100,
      checkedTerms: false

    }
  },
  created() {

  },
  methods: {

  }
});
</script>