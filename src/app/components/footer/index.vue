<template>
    <nav class="navbar navbar-light footer-nav d-none d-lg-block" :class="{'is-advert':isAdvert}">
        <div class="container py-2">
            <span>©Telepay.io, 2017-{{year}} гг. Все права защищены</span>
            <a href="https://landing.telepay.io/privacy-policy.html" target="_blank">Политика конфиденциальности</a>
            <a href="https://landing.telepay.io/terms-and-conditions.html" target="_blank">Условия использования</a>
            <a href="https://landing.telepay.io/contacts.html" target="_blank">Контакты</a>
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
