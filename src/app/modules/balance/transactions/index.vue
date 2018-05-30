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
    computed: {
        user() { return this.$store.state.user }
    },
    methods: {
        async getTransactions() {
            let transactions = await BalanceApi.getTransactions();
            this.transactions = transactions.filter(t => t.type !== 0).sort((a, b) => b.createdAt - a.createdAt)
        },
        isPositiveType(type) {
            return [0, 2, 4, 6].includes(type);
        }
    }
});
</script>