<template src="./index.html"></template>
<script>
import { ChannelApi } from '@services/api';
import avatar from '@components/avatar';
import heading from '@components/heading';
import timeframes from '@components/timeframes';
import onOff from 'vue-on-off';
import { clone } from '@utils/clone';
import parseLinks from '@filters/parse-links'
export default {
    components: {
        avatar,
        onOff,
        timeframes,
        heading
    },
    data() {
        return {
            channel: {}
        };
    },
    methods: {
        showDescription(description) {
            swal({
                // text: description || 'Нет описания',
                showCloseButton: true,
                showCancelButton: false,
                showConfirmButton: false,
                animation: false,
                padding: 30,
                html: parseLinks(this.channel.description, 'Нет описания')
            });
            document.querySelector('.swal2-close').blur();
        }
    },
    computed: {
        isMobile() {
            return this.$mq == 'sm'
        },
        isDesktop() {
            return this.$mq != 'sm'
        },
        mappedToSelected() {
            let copy = clone(this.channel);
            copy.selected = true;
            copy.cheapestTimeFrame = ChannelApi.getCheapestTimeFrame(copy);
            copy.cheapestTimeFrame.selected = true;
            copy.timeFrame = [copy.cheapestTimeFrame];
            return [copy];
        }
    },
    async created() {
        this.channel = await ChannelApi.show({
            channelId: this.$route.params.username
        });

        this.channel.cheapestTimeFrame = ChannelApi.getCheapestTimeFrame(this.channel);

        if (this.channel && this.channel.userId === this.$store.state.user.userId) {
            this.$router.replace({ name: 'channels:update', params: { username: this.$route.params.username } });
        }
    }
};
</script>
<style lang="css">
</style>