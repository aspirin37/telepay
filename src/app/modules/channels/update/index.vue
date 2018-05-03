<template src="./index.html"></template>
<script>
import onOff from 'vue-on-off';
import avatar from '@components/avatar';
import timeframes from '@components/timeframes';
import { ChannelApi } from '@services/api';

export default {
  components: { avatar, onOff, timeframes },
  data() {
    return {
      channel: { isConfirmed: false },
      selectedCells: []
    };
  },
  created() {
    this.getChannelInfo();
    this.$root.$on('addedChannelOffer', this.getChannelInfo);
  },
  destroyed() {
    this.$root.$off('addedChannelOffer', this.getChannelInfo);
  },
  computed: {
    mappedTimeframes() {
      return (this.channel && this.channel.timeFrame) || [];
    }
  },
  methods: {
    async getChannelInfo() {
      this.channel = await ChannelApi.show({ channelId: this.$route.params.id });
    },
    createTimeFrame() {}
  }
};
</script>
