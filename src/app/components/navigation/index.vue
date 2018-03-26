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
          <router-link :to="{name:'channel'}" class="nav-link">Каналы</router-link>
        </li>
        <li class="nav-item py-3">
          <router-link :to="{name:'post'}" class="nav-link">Предложения</router-link>
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
              <drop-down class="py-3" event-trigger="hover">
                <div class="notifs__wrap" slot="trigger">
                  <i class="fa fa-bell" aria-hidden="true"></i>
                  <span class="badge badge-pill badge-success">1</span>
                </div>
                <template slot="body">
                  <drop-down-menu-item title>
                    Уведомления
                  </drop-down-menu-item>
                  <drop-down-menu-item>
                    Бла блабал блабал блабалблабал блабал блабал блабал блабалблабал блабал блабал
                  </drop-down-menu-item>
                  <drop-down-menu-item>
                    залупа цветочная
                  </drop-down-menu-item>
                  <drop-down-menu-item>
                    блабалблабал блабалблабал блабал блабал блабал
                  </drop-down-menu-item>
                </template>
              </drop-down>
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
                  <span>{{ getUsername }}</span>
                </div>
                <template slot="body">
                  <drop-down-menu-item>
                    <router-link class="user-menu__item" :to="{ name: 'profile' }">Профиль</router-link>
                  </drop-down-menu-item>
                  <drop-down-menu-item>
                    <router-link class="user-menu__item" :to="{ name: 'favs' }">Избранное</router-link>
                  </drop-down-menu-item>
                  <drop-down-menu-item>
                    <router-link class="user-menu__item" :to="{ name: 'logout' }">Выйти</router-link>
                  </drop-down-menu-item>
                </template>
              </drop-down>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import dropDown from '@components/dropdown';
import dropDownMenuItem from '@components/dropdown/menu-item.vue';
import Logo from '@assets/logo.svg';
import LS from '@utils/local_storage';
import { mapGetters } from 'vuex';

export default Vue.extend({
  components: { dropDown, dropDownMenuItem },
  data() {
    return {
      isVisible: false,
      Logo
    };
  },
  computed: {
    ...mapGetters({
      hasUser: 'hasUser',
      getUsername: 'getUsername'
    }),
    logoVisible() {
      return this.$route.name !== 'main' && !this.$route.fullPath.includes('auth');
    },
    isAuthorized() {
      return this.hasUser && LS.get('auth_key');
    }
  }
});
</script>
