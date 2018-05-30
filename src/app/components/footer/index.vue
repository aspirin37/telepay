<template>
  <nav class="navbar navbar-light footer-nav" :class="{'is-advert':isAdvert}" v-if="!isMobileSupportChat">
    <div class="footer-wrapper container py-2">
      <span class="order-last order-lg-first">©Telepay.io, 2017-{{year}} гг.<br class="d-lg-none"> Все права защищены</span>
      <a class="footer-nav__item" href="https://landing.telepay.io/privacy-policy.html" target="_blank">Политика конфиденциальности</a>
      <a class="footer-nav__item" href="https://landing.telepay.io/terms-and-conditions.html" target="_blank">Условия использования</a>
      <a class="footer-nav__item order-first order-lg-last" href="https://landing.telepay.io/contacts.html" target="_blank">Контакты</a>
    </div>
  </nav>
</template>
<script type="text/javascript">
export default {
  computed: {
    isMobileSupportChat() {
      return this.$mq == 'sm' && this.$route.path == '/support/create' && this.$route.query.ticketId;
    },
    isAdvert: {
      get() {
        return this.$store.state.is_advert;
      },
      set(val) {
        WebStorage.set('is_advert', val);
        this.$store.commit('CHANGE_STATE', { key: 'is_advert', value: val });
        this.$router.push({ name: val ? 'catalog' : 'channels:list' });
      }
    }
  },
  data() {
    return {
      year: moment().year()
    };
  }
};
</script>

