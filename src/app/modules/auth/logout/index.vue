<template></template>
<script>
import { AuthApi } from '@services/api';
import WebStorage from '@utils/storage';
export default {
    created() {
        AuthApi.logout().finally(() => this.clearFront());
    },
    methods: {
        clearFront() {
            WebStorage.clear();
            delete Vue.http.headers.common['X-API-TOKEN'];
            this.$store.dispatch('DROP_STATE');
            this.$router.push({ name: 'login' });
        }
    }
};
</script>