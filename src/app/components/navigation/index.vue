<template src="./index.html"></template>
<script>
import dropDown from '@components/dropdown';
import dropDownMenuItem from '@components/dropdown/menu-item.vue';
import onOff from 'vue-on-off';
import Logo from '@assets/logo.svg';
import WebStorage from '@utils/storage';
import { clone } from '@utils/clone';
import { mapGetters } from 'vuex';
import { NotificationApi } from '@services/api';

export default Vue.extend({
    components: { onOff, dropDown, dropDownMenuItem },
    data() {
        return {
            isVisible: false,
            Logo,
            showDD: false,
            notifications: [],
            notificationsCount: 0,
            updateTimeout: null,
            year: moment().year()
        };
    },
    created() {
        this.getNotificationList();
    },
    destroyed() {
        clearTimeout(this.updateTimeout);
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
            hasUser: 'hasUser',
            getUsername: 'getUsername',
            balance: 'getUserBalance'
        }),
        logoVisible() {
            return this.$route.name !== 'main' && !this.$route.fullPath.includes('auth');
        },
        isAuthorized() {
            return this.hasUser && WebStorage.get('auth_key');
        }
    },
    methods: {
        toggleDD() {
            this.showDD = !this.showDD
            if (this.showDD) this.$refs.ddmenu.scrollTop = 0;
        },
        blurHandler() {
            this.closeDDTimeout = setTimeout(() => {
                this.showDD = false
            }, 200);
        },
        stopBlur() {
            clearTimeout(this.closeDDTimeout);
        },
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