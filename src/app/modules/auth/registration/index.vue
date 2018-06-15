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
            isLoading: false,
            errors: {
                checkedTerms: false,
                passwordMatch: false
            }
        };
    },
    computed: {
        passValidity() {
            return (this.user.password && this.passCheck) ? this.user.password === this.passCheck : true;
        }
    },
    watch: {
        passCheck() {
            return this.passValid
        }
    },
    created() {},
    methods: {
        register(ev) {
            this.isLoading = true
            ev.preventDefault();
            if ((this.user.password && this.passCheck) && this.passValidity && this.checkedTerms) {
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
                            this.$router.push({ name: "catalog" });
                            if (window.yaCounter48703889) window.yaCounter48703889.reachGoal('tp_reg')
                        } else {
                            WebStorage.clear();
                            delete Vue.http.headers.common["X-API-TOKEN"];
                        }
                    })
                    .catch(err => console.error(err))
                    .finally(() => {
                        this.isLoading = false
                    })
            } else if (!this.checkedTerms) {
                this.errors.checkedTerms = true;
            }
        }
    },
    template
});
</script>
