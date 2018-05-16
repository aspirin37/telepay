<script>
import template from "./index.html";
import { UserApi } from "@services/api";

export default Vue.extend({
  data() {
    return {
      code: this.$route.query.code,
      pass: null,
      passCheck: null,
      validations: {
        passwordMatch: false
      }
    };
  },
  props: {},
  created() {},
  methods: {
    setNewPassword(evt) {
      evt.preventDefault();
      if (this.pass === this.passCheck) {
        let data = {
          password: this.pass,
          code: this.code
        };
        UserApi.resetPassByMail(data).then(() => {
          this.$router.push({
            name: "login"
          });
        });
      } else {
        this.validations.passwordMatch = true;
      }
    }
  },
  template
});
</script>
