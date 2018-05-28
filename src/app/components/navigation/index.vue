<template src="./index.html"></template>
<script>
import dropDown from '@components/dropdown';
import dropDownMenuItem from '@components/dropdown/menu-item.vue';
import onOff from 'vue-on-off';

import WebStorage from '@utils/storage';
import { clone } from '@utils/clone';
import { mapGetters } from 'vuex';
import { NotificationApi } from '@services/api';

import LogoDesktop from '@assets/logo.svg';
import LogoMobile from '@assets/logo-mobile.svg';
import Burger from '@assets/burger-01.svg';
import Question from '@assets/vopros.svg';
import Wallet from '@assets/money.svg';
import Bell from '@assets/bell.svg';
import Catalog from '@assets/catalog.svg';
import Channels from '@assets/channels.svg';
import Posts from '@assets/message.svg';
import Support from '@assets/support.svg';
import Exit from '@assets/exit.svg';
import Payments from '@assets/payments.svg';
import Cross from '@assets/crest-01.svg';

export default Vue.extend({
  components: { onOff, dropDown, dropDownMenuItem },
  data() {
    return {
      isVisible: false,
      showDD: false,
      notifications: [],
      notificationsCount: 0,
      updateTimeout: null,
      year: moment().year(),
      LogoDesktop,
      LogoMobile,
      Burger,
      Question,
      Wallet,
      Bell,
      Catalog,
      Channels,
      Posts,
      Support,
      Exit,
      Payments,
      Cross
    };
  },
  created() {
    this.getNotificationList();
    this.addWindowResizeHandler();
  },
  watch: {
    // $route(to, from) {
    //   this.$store.commit('TOGGLE_MENU', false);
    // },
    isMenuOpened() {
      document.querySelector('.app-wrapper').classList.toggle('app-wrapper--toggled');
    },
    isAuthorized() {
      if (!this.isAuthorized) {
        this.$store.commit('TOGGLE_MENU', false);
        document.querySelector('.app-wrapper').classList.remove('app-wrapper--toggled');
      }
    }
  },
  computed: {
    isAdvert: {
      get() {
        return this.$store.state.is_advert;
      },
      set(val) {
        WebStorage.set('is_advert', val);
        this.$store.commit('CHANGE_STATE', { key: 'is_advert', value: val });
        this.$router.push({ name: val ? 'catalog' : 'channels:list' });
      }
    },
    ...mapGetters({
      isAuthorized: 'isAuthorized',
      getUsername: 'getUsername',
      balance: 'getUserBalance',
      isMenuOpened: 'getMenuState'
    }),
    logoVisible() {
      return this.$route.name !== 'main' && !this.$route.fullPath.includes('auth');
    }
  },
  methods: {
    addWindowResizeHandler() {
      window.addEventListener('resize', () => {
        this.$store.commit('TOGGLE_MENU', false);
        document.querySelector('.app-wrapper').classList.remove('app-wrapper--toggled');
      });
    },
    toggleMenu() {
      this.$store.commit('TOGGLE_MENU', !this.isMenuOpened);
    },
    toggleDD() {
      this.showDD = !this.showDD;
      if (this.showDD) this.$refs.ddmenu.scrollTop = 0;
    },
    blurHandler() {
      this.closeDDTimeout = setTimeout(() => {
        this.showDD = false;
      }, 200);
    },
    stopBlur() {
      clearTimeout(this.closeDDTimeout);
    },
    async getNotificationList() {
      clearTimeout(this.updateTimeout);
      if (this.user && this.user.user_id) {
        let { items, total } = await NotificationApi.list();
        this.notifications = items;
        this.notificationsCount = total;
      }
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