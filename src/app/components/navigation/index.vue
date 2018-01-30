<template>
  <nav class="navbar bg-light" :class="{ 'navbar_main': !logoVisible }">
    <div class="container flex-nowrap py-2">
      <router-link :to="{ name: 'main' }" v-if="logoVisible" class="navbar__logo">
        <div class="logo" v-once v-html="Logo"></div>
      </router-link>
      <ul class="nav nav_toggle justify-content-center d-md-flex w-100 pt-3 pt-sm-0" :class="{ 'd-none': !isVisible }">
        <li class="nav-item">
          <router-link :to="{name:'catalog'}" class="nav-link">Каталог</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name:'support'}" class="nav-link">Поддержка</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name:'faq'}" class="nav-link">F.A.Q.</router-link>
        </li>
        <li class="ml-auto">
          <ul class="list-unstyled d-flex" v-if="!isAuthorized">
            <li class="nav-item">
              <router-link :to="{name:'login'}" class="nav-link">Войти</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name:'registration'}" class="nav-link">Регистрация</router-link>
            </li>
          </ul>
          <ul class="list-unstyled d-flex h-100" v-if="isAuthorized">
            <li class="nav-item">
              <drop-hover>
                <div class="notifs__wrap" slot="trigger">
                  <i class="fa fa-bell" aria-hidden="true"></i>
                  <span class="badge badge-pill badge-danger">1</span>
                </div>
                <div class="notifs" slot="body">
                  <ul class="list-group">
                    <li class="list-group-item bg-light"><strong>Уведомления</strong></li>
                    <li class="list-group-item bg-light">Бла блабал блабал блабалблабал блабал блабал блабал блабалблабал блабал блабал</li>
                    <li class="list-group-item bg-light">блабал блабал блабал блабал блабалблабал блабал</li>
                    <li class="list-group-item bg-light">блабалблабал блабалблабал блабал блабал блабал</li>
                  </ul>
                </div>
              </drop-hover>
            </li>
            <li class="nav-item">
              <i class="fa fa-wallet" aria-hidden="true"></i>
            </li>
            <li class="nav-item">
              <div class="user-field">
                <i class="fa fa-user-circle mr-1" aria-hidden="true"></i>
                <span>user@username.com</span>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import dropHover from '@components/drop-hover';
import Logo from '@assets/logo.svg';
// import dropdown from '@components/dropdown';
export default Vue.extend( {
  components: { dropHover },
  data() {
    return {
      isVisible: false,
      Logo
    }
  },
  computed: {
    logoVisible() {
      return this.$route.name !== 'main' ;
    },
    isAuthorized() {
      return true;
    }
  },
  mounted() {
  },
  methods: {
  },
} );
</script>
