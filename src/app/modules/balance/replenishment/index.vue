<template src="./index.html"></template>
<script>
import normCheckbox from '@components/checkbox';
import { BalanceApi } from '@services/api';
export default Vue.extend({
    components: { normCheckbox },
    data() {
        return {
            amount: 100,
            checkedTerms: false,
            formLink: ''
        };
    },
    async created() {
        let link = await BalanceApi.getForm({ amount: 100 });
        this.formLink = decodeURIComponent(link)
    },
    methods: {}
});
</script>