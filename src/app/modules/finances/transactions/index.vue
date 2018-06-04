<template src="./index.html"></template>
<script>
import transactionTypes from '@utils/transaction-types';
import { FinancesApi } from '@services/api';
export default {
    data() {
        return {
            transactionTypes,
            transactions: []
        };
    },
    created() {
        this.getTransactions();
    },
    methods: {
        async getTransactions() {
            let transactions = await FinancesApi.getTransactions()
            this.transactions = transactions.items.sort((a, b) => b.createdAt - a.createdAt);
        },
        isPositiveType(type) {
            return [0, 2, 4, 6].includes(type);
        }
    }
};
</script>