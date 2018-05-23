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
      Bell
    };
  },
  created() {
    this.getNotificationList();
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
      balance: 'getUserBalance'
    }),
    logoVisible() {
      return this.$route.name !== 'main' && !this.$route.fullPath.includes('auth');
    }
  },
  methods: {
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