<template src="./index.html"></template>
<script>
import {
    mapState
} from 'vuex';
import passwordInput from '@components/password-input';
import {
    UserApi
} from '@services/api';
import {
    clone
} from '@utils/clone';
import WebStorage from '@utils/storage';

export default {
    components: {
        passwordInput
    },
    data() {
        return {
            fetchedUser: null,
            fetchTimeout: null
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
        }
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
            } else {
                this.$store.commit('SET_USER', this.fetchedUser);
            }
        },
        async getUser() {
            this.fetchedUser = await UserApi.getUser();
        }
    }
};
</script>