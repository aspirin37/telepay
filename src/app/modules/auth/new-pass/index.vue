<script>
import template from "./index.html";
import { UserApi } from "@services/api";

export default Vue.extend({
    data() {
        return {
            code: this.$route.query.code,
            pass: null,
            passCheck: null,
            isLoading: false,
            validations: {
                passwordMatch: false
            }
        };
    },
    props: {},
    created() {
        if (!this.code) {
            this.$router.replace({ name: 'login' })
        }
    },
    methods: {
        setNewPassword(evt) {
            this.isLoading = true
            evt.preventDefault();
            if (this.pass === this.passCheck) {
                let data = {
                    password: this.pass,
                    code: this.code
                };
                UserApi.resetPassByMail(data)
                    .then(() => {
                        this.$router.push({ name: "login" });
                    })
                    .finally(() => {
                        this.isLoading = false
                    });
            } else {
                this.validations.passwordMatch = true;
            }
        }
    },
    template
});
</script>
