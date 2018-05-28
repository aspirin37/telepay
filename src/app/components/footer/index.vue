<template>
  <nav class="navbar navbar-light footer-nav" :class="{'is-advert':isAdvert}">
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
  data() {
    return {
      year: moment().year(),
      isAdvert: this.$store.state.is_advert
    };
  }
};
</script>

