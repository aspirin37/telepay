<template>
  <nav class="d-flex header" :class="{ 'navbar_main': !logoVisible }">
    <div class="container d-flex">
      <router-link :to="{ name: isAuthorized?'catalog':'login' }" v-if="logoVisible" class="navbar__logo py-3">
        <div class="logo" v-once v-html="Logo"></div>
      </router-link>
      <ul class="nav nav_toggle justify-content-center d-md-flex w-100 pt-3 pt-sm-0" :class="{ 'd-none': !isVisible }">
        <li class="nav-item py-3">
          <router-link :to="{name:'catalog'}" class="nav-link">Каталог</router-link>
        </li>
        <li class="nav-item py-3">
          <router-link :to="{name:'support'}" v-if="isAuthorized" class="nav-link">Техподдержка</router-link>
        </li>
        <li class="nav-item py-3">
          <!-- <router-link :to="{name:'faq'}" v-if="!isAuthorized" class="nav-link">F.A.Q.</router-link> -->
          <a href="https://landing.telepay.io/faq.html" v-if="!isAuthorized" class="nav-link">F.A.Q.</a>
        </li>
        <li class="nav-item py-3" v-if="isAuthorized">
          <router-link :to="{name:'channels'}" class="nav-link">Каналы</router-link>
        </li>
        <li class="nav-item py-3" v-if="isAuthorized">
          <router-link :to="{name:'posts'}" class="nav-link">Постинг</router-link>
        </li>
        <li class="ml-auto">
          <ul class="list-unstyled d-flex" v-if="!isAuthorized">
            <li class="nav-item py-3">
              <router-link :to="{name:'login'}" class="nav-link login-btn">Войти</router-link>
            </li>
            <li class="nav-item py-3">
              <router-link :to="{name:'registration'}" class="nav-link">Регистрация</router-link>
            </li>
          </ul>
          <ul class="list-unstyled d-flex h-100" v-if="isAuthorized">
            <li class="nav-item notifications">

              <button class="btn btn-link notification-trigger" @click="showDD = !showDD">
                <i class="fa fa-lg fa-bell"></i>
                <span class="badge badge-pill badge-success" v-show="notificationsCount > 0">{{ notificationsCount }}</span>
              </button>
              <!-- FIXME надо сделать так чтобы скрывалось только при клике вне уведомлений -->
              <transition name="fade">
                <div class="dropdown-menu show" v-show="showDD" ref="ddmenu">
                  <h6 class="dropdown-header">{{notificationsCount?'Уведомления':'Уведомлений нет'}}</h6>
                  <span class="dropdown-item" v-for="notify in notifications" :key="notify.notificationId">
                    <div class="form-row">
                      <div class="col-10" v-html="notify.text"></div>
                      <div class="col-2">
                        <i class="fa fa-times fa-lg pointer text-right" @click="setIsRead(notify.notificationId)"></i>
                      </div>
                    </div>
                  </span>
                </div>
              </transition>

              <!-- <drop-down class="py-3" event-trigger="hover">
                <div class="notifs__wrap" slot="trigger">
                  <i class="fa fa-lg fa-bell"></i>
                  <span class="badge badge-pill badge-success" v-show="notificationsCount > 0">{{ notificationsCount }}</span>
                </div>
                <template slot="body">
                  <drop-down-menu-item v-if="notificationsCount > 0">
                    <b>Уведомления</b>
                  </drop-down-menu-item>
                  <drop-down-menu-item v-if="notificationsCount == 0">
                    Уведомлений нет
                  </drop-down-menu-item>
                  <drop-down-menu-item>
                    <div>
                      {{ notify.text }}
                      <i class="fa fa-times pointer" @click="setIsRead(notify.notificationId)"></i>
                    </div>
                  </drop-down-menu-item>
                </template>
              </drop-down> -->
            </li>
            <li class="nav-item py-3">
              <div class="user-field">
                <i class="fa fa-money" aria-hidden="true"></i>
                <span>{{ balance.current | centToRub }}
                  <span class="text-muted">({{ balance.hold | centToRub }})</span>
                </span>
              </div>
            </li>
            <li class="nav-item mr-4">
              <drop-down class="py-3">
                <div class="user-field" slot="trigger">
                  <i class="fa fa-2x fa-user-circle mr-1" aria-hidden="true"></i>
                </div>
                <template slot="body">
                  <drop-down-menu-item>
                    <router-link class="user-menu__item" :to="{ name: 'profile' }">Профиль</router-link>
                  </drop-down-menu-item>
                  <!-- <drop-down-menu-item>
                    <router-link class="user-menu__item" :to="{ name: 'favs' }">Избранное</router-link>
                  </drop-down-menu-item> -->
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
import LS from '@utils/local-storage';
import { clone } from '@utils/clone';
import { mapGetters } from 'vuex';
import { NotificationApi } from '@services/api';

export default Vue.extend({
  components: { dropDown, dropDownMenuItem },
  data() {
    return {
      isVisible: false,
      Logo,
      showDD: false,
      notifications: [],
      notificationsCount: 0,
      updateTimeout: null
    };
  },
  created() {
    this.getNotificationList();
  },
  computed: {
    ...mapGetters({
      hasUser: 'hasUser',
      getUsername: 'getUsername',
      balance: 'getUserBalance'
    }),
    logoVisible() {
      return this.$route.name !== 'main' && !this.$route.fullPath.includes('auth');
    },
    isAuthorized() {
      return this.hasUser && LS.get('auth_key');
    }
  },
  methods: {
    async getNotificationList() {
      clearTimeout(this.updateTimeout);
      let { items, total } = await NotificationApi.list();
      this.notifications = items;
      this.notificationsCount = total;
      this.updateTimeout = setTimeout(this.getNotificationList, 1e4);
    },
    async setIsRead(notificationId) {
      let cachedNotifications = clone(this.notifications);
      this.notifications = this.notifications.filter(n => n.notificationId !== notificationId);

      await NotificationApi.markAsRead({ notificationId });
      this.getNotificationList();
    }
  }
});
</script>
