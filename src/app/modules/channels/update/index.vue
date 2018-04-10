<template src="./index.html"></template>
<script>
import onOff from 'vue-on-off';
import avatar from '@components/avatar';
import offersList from '@components/offers-list';
import { ChannelApi } from '@services/api';

export default {
  components: { avatar, onOff, offersList },
  data() {
    return {
      channel: { isConfirmed: false }
    };
  },
  created() {
    this.getChannelInfo();
    this.$root.$on('addedChannelOffer', this.getChannelInfo);
  },
  destroyed() {
    this.$root.$off('addedChannelOffer', this.getChannelInfo);
  },
  methods: {
    async getChannelInfo() {
      this.channel = await ChannelApi.show({ channelId: this.$route.params.id });
    }
  }
};
</script>
