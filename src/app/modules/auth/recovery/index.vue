<script>
import template from './index.html';
import { UserApi } from '@services/api';
import loginInput from '@components/login-input';

export default Vue.extend({
    components: {
        loginInput
    },
    data() {
        return {
            login: this.$route.params.login || '',
            isLoading: false,
        };
    },
    methods: {
        recover(ev) {
            this.isLoading = true
            ev.preventDefault();
            UserApi.requestResetPass({ login: this.login })
                .then(res => {
                    // if (/\+7\d{10}/.test(this.login)) {
                    //     this.$router.push({ name: 'new_pass', query: { phone: this.login } });
                    // }
                })
                .catch(err => console.error(err))
                .finally(() => {
                    this.isLoading = false
                });
        }
    },
    template
});
</script>
