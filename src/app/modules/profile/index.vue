<template src="./index.html"></template>
<script>
import { mapState } from 'vuex';
import passwordInput from '@components/password-input';
import { UserApi } from '@services/api';
import { clone } from '@utils/clone';
import WebStorage from '@utils/storage';
import onOff from 'vue-on-off';

export default {
    components: {
        passwordInput,
        onOff
    },
    data() {
        return {
            fetchedUser: null,
            fetchTimeout: null,
            passData: { old_password: '', new_password: '' },
            notifications: {}
        };
    },
    computed: {
        user: {
            get() {
                return this.$store.state.user;
            },
            set(val) {
                this.$store.commit('SET_USER', user);
            }
        },
        emailSettings() {
            if (!this.user || !this.user.settings || !this.user.settings.length) return null;
            return this.user.settings.find(s => s.settingType + '' === '0')
        },
        telegramSettings() {
            if (!this.user || !this.user.settings || !this.user.settings.length) return null;
            return this.user.settings.find(s => s.settingType + '' === '1')
        }
    },
    created() {
        this.cache = clone(this.user);
        this.getUser();
    },
    destroyed() {
        clearTimeout(this.fetchTimeout);
    },
    methods: {
        startFetchingUser() {
            clearTimeout(this.fetchTimeout);
            if (!this.fetchedUser || this.user.telegramId === this.fetchedUser.telegramId) {
                this.getUser();
                this.fetchTimeout = setTimeout(this.startFetchingUser, 1500);
            }
        },
        async getUser() {
            this.fetchedUser = await UserApi.getUser();
            this.$store.commit('SET_USER', this.fetchedUser);
            this.notifications = {
                email: !!+(this.emailSettings && this.emailSettings.settingValue),
                telegram: !!+(this.telegramSettings && this.telegramSettings.settingValue),
            }
        },
        async editUser(needPassword) {
            let swalOut;
            if (needPassword) {
                swalOut = await swal({
                    title: 'Для изменения email необходимо ввести пароль',
                    input: 'password'
                });
            }
            if (swalOut && swalOut.dismiss) return;

            let { name, email } = clone(this.user);
            let data = { name, email: email.address };
            if (swalOut && swalOut.value) data.password = swalOut.value

            UserApi.update(data).catch((err) => {
                console.log(err)
            });
        },
        changePassword() {
            let { new_password, old_password } = this.passData;
            UserApi.changePassword({ new_password, old_password })
                .then(() => {
                    Vue.set(this, 'passData', { old_password: '', new_password: '' })
                    console.log(this.passData)
                });
        },
        changeNotifySettings(settingId, settingValue) {
            UserApi.saveSettings({ settingId, settingValue })
        },
        showRef() {
            swal({
                width: this.$mq == 'sm' ? '90%' : '60%',
                showCloseButton: true,
                showCancelButton: false,
                padding: 15,
                html: require('./ref-popup.html'),
                confirmButtonText: "Закрыть",
            });
        },
    }
};
</script>