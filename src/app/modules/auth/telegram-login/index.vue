<template>
    <div></div>
</template>
<script>
import { UserApi } from '@services/api';
import WebStorage from '@utils/storage';
export default Vue.extend({
    data() {
        return {};
    },
    created() {
        if (this.$route.query && this.$route.query.t) {
            Vue.http.headers.common['X-API-TOKEN'] = this.$route.query.t;
            WebStorage.set('auth_key', this.$route.query.t);
            this.getUser();
        } else {
            this.$router.push({ name: 'login' });
        }
    },
    methods: {
        async getUser() {
            let user = await UserApi.getUser();
            if (['user', 'admin', 'confirmed'].includes(user.roles)) {
                this.$store.commit('SET_USER', user);
                this.$router.push({ name: 'catalog' });
            } else {
                this.$notifystr.danger('Ошибка входа!', 'Профиль не является профилем пользователя');
                this.$store.commit('SET_USER', null);
                WebStorage.clear();
            }
        }
    }
});
</script>