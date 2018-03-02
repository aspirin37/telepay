<template>
  <nav class="d-flex bg-light" :class="{ 'navbar_main': !logoVisible }">
    <div class="container d-flex">
      <router-link :to="{ name: 'main' }" v-if="logoVisible" class="navbar__logo py-3">
        <div class="logo" v-once v-html="Logo"></div>
      </router-link>
      <ul class="nav nav_toggle justify-content-center d-md-flex w-100 pt-3 pt-sm-0" :class="{ 'd-none': !isVisible }">
        <li class="nav-item py-3">
          <router-link :to="{name:'catalog'}" class="nav-link">Каталог</router-link>
        </li>
        <li class="nav-item py-3">
          <router-link :to="{name:'support'}" class="nav-link">Поддержка</router-link>
        </li>
        <li class="nav-item py-3">
          <router-link :to="{name:'faq'}" class="nav-link">F.A.Q.</router-link>
        </li>
        <li class="ml-auto">
          <ul class="list-unstyled d-flex" v-if="!isAuthorized">
            <li class="nav-item py-3">
              <router-link :to="{name:'login'}" class="nav-link">Войти</router-link>
            </li>
            <li class="nav-item py-3">
              <router-link :to="{name:'registration'}" class="nav-link">Регистрация</router-link>
            </li>
          </ul>
          <ul class="list-unstyled d-flex h-100" v-if="isAuthorized">
            <li class="nav-item">
              <drop-hover class="py-3">
                <div class="notifs__wrap" slot="trigger">
                  <i class="fa fa-bell" aria-hidden="true"></i>
                  <span class="badge badge-pill badge-success">1</span>
                </div>
                <div class="notifs" slot="body">
                  <ul class="list-group">
                    <li class="list-group-item bg-light text-medium-font"><strong>Уведомления</strong></li>
                    <li class="list-group-item bg-light text-medium-font">
                      Бла блабал блабал блабалблабал блабал блабал блабал блабалблабал блабал блабал
                    </li>
                    <li class="list-group-item bg-light text-medium-font">
                      залупа цветочная
                    </li>
                    <li class="list-group-item bg-light text-medium-font">
                      блабалблабал блабалблабал блабал блабал блабал
                    </li>
                  </ul>
                </div>
              </drop-hover>
            </li>
            <li class="nav-item py-3">
              <div class="user-field">
                <i class="fa fa-wallet" aria-hidden="true"></i>
                <span>20 000₽</span>
              </div>
            </li>
            <li class="nav-item">
              <drop-down class="py-3">
                <div class="user-field" slot="trigger">
                  <i class="fa fa-user-circle mr-1" aria-hidden="true"></i>
                  <span>user@username.com</span>
                </div>
                <div class="user-menu" slot="body">
                  <router-link class="user-menu__item bg-light text-medium-font" :to="{ name: 'profile' }">Профиль</router-link>
                  <router-link class="user-menu__item bg-light text-medium-font" :to="{ name: 'favs' }">Избранное</router-link>
                  <router-link class="user-menu__item bg-light text-medium-font" :to="{ name: 'my-channels' }">Мои каналы</router-link>
                  <router-link class="user-menu__item bg-light text-medium-font" :to="{ name: 'projects' }">Проекты</router-link>
                  <router-link class="user-menu__item user-menu__item_last bg-light text-medium-font" :to="{ name: 'logout' }">Выйти</router-link>
                </div>
              </drop-down>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import dropHover from '@components/drop-hover';
import dropDown from '@components/dropdown';
import Logo from '@assets/logo.svg';
// import dropdown from '@components/dropdown';
export default Vue.extend( {
  components: { dropHover, dropDown },
  data() {
    return {
      isVisible: false,
      Logo
    }
  },
  computed: {
    logoVisible() {
      return this.$route.name !== 'main' && !this.$route.fullPath.includes('auth');
    },
    isAuthorized() {
      return this.$route.name !== 'main' && !this.$route.fullPath.includes('auth');
    }
  },
  mounted() {
  },
  methods: {
  },
} );
</script>
