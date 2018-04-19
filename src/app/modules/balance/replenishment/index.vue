<template>
    <form id="brick-creditcard-form" action="billing.php" method="POST">
        <input name="custom_parameter" type="hidden" value="custom_value" />
        <div>
            <label>
                <span>Card number</span>
                <input data-brick="card-number" type="text" />
            </label>
        </div>
        <div>
            <label>
                <span>Card expiration</span>
                <input data-brick="card-expiration-month" type="text" size="2" /> /
                <input data-brick="card-expiration-year" type="text" size="4" />
            </label>
        </div>
        <div>
            <label>
                <span>Card CVV</span>
                <input data-brick="card-cvv" type="text" />
            </label>
        </div>
        <button type="submit">Submit</button>
    </form>
</template>
<script>
export default Vue.extend({
  data() {
    return {};
  },
  created() {
    require('./brick');
    Brick(
      {
        public_key: 't_e3c1772d7072c303a474302448fbf5',
        form: { id: 'brick-creditcard-form' },
        onTokenized: function() {
          /* submit form */
        },
        onError: function(errors) {
          /* show errors */
        }
      },
      'custom'
    );
  },
  methods: {}
});
</script>
