<script>
import template from "./index.html";

import { AuthApi, UserApi } from "@services/api";
import WebStorage from "@utils/storage";
import normCheckbox from "@components/checkbox";
import { clone } from "@utils/clone";

export default Vue.extend({
    components: {
        normCheckbox
    },
    data() {
        return {
            user: {
                login: this.$route.params.login || null,
                password: null
            },
            passCheck: null,
            checkedTerms: false,
            validations: {
                checkedTerms: false,
                passwordMatch: false
            }
        };
    },
    created() {},
    methods: {
        register(ev) {
            ev.preventDefault();
            if (this.user.password === this.passCheck && this.checkedTerms) {
                let cloned = clone(this.user);
                if (this.$route.query.ref) {
                    cloned.refCode = this.$route.query.ref;
                }
                if (this.$route.query.tg) {
                    cloned.telegramId = this.$route.query.tg;
                }
                AuthApi.register(cloned)
                    .then(res => {
                        if (res && res.token) {
                            Vue.http.headers.common["X-API-TOKEN"] = res.token;
                            WebStorage.set("auth_key", res.token);
                            return UserApi.getUser();
                        }
                        return null;
                    })
                    .then(res => {
                        if (res) {
                            this.$store.commit("SET_USER", res);
                            this.$router.push({
                                name: "catalog"
                            });
                            yaCounter48703889.reachGoal('tp_reg')
                        }
                    })
                    .catch(err => console.error(err));
            } else {
                if (!this.checkedTerms) {
                    this.validations.checkedTerms = true;
                }
                if (this.user.password !== this.passCheck) {
                    this.validations.passwordMatch = true;
                }
            }
        }
    },
    template
});
</script>