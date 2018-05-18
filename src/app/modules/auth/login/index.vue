<script>
import template from './index.html';

import { AuthApi, UserApi } from '@services/api';
import WebStorage from '@utils/storage';
import loginInput from '@components/login-input';
import { clone } from '@utils/clone';

export default Vue.extend({
    components: { loginInput },
    data() {
        return {
            user: {
                login: this.$route.params.login || ''
            }
        };
    },
    methods: {
        login(ev) {
            ev.preventDefault();

            let cloned = clone(this.user);
            AuthApi.login(cloned)
                .then(res => {
                    if (res && res.token) {
                        Vue.http.headers.common['X-API-TOKEN'] = res.token;
                        WebStorage.set('auth_key', res.token);
                        return UserApi.getUser();
                    }
                    return null;
                })
                .then(res => {
                    if (res) {
                        if (['user', 'admin', 'confirmed'].includes(res.roles)) {
                            this.$store.commit('SET_USER', res);
                            this.$router.push({ name: 'catalog' });
                        } else {
                            this.$notifystr.danger('Ошибка входа!', 'Профиль не является профилем пользователя');
                            this.$store.commit('SET_USER', null);
                            WebStorage.clear();
                        }
                    }
                })
                .catch(err => console.error(err));
        }
    },
    template
});
</script>