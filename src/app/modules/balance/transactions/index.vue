<template src="./index.html"></template>
<script>
import { BalanceApi } from '@services/api';
import transactionTypes from '@utils/transaction-types';
export default Vue.extend({
  data() {
    return {
      transactions: [],
      transactionTypes
    };
  },
  created() {
    this.getTransactions();
  },
  methods: {
    async getTransactions() {
      this.transactions = await BalanceApi.getTransactions();
    },
    isPositiveType(type) {
      return [].includes(type);
    }
  }
});
</script>
