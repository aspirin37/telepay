<template src="./index.html"></template>
<script>
import { ChannelApi } from '@services/api';
import avatar from '@components/avatar';
import timeframes from '@components/timeframes';
import onOff from 'vue-on-off';
import { clone } from '@utils/clone';
export default {
  components: {
    avatar,
    onOff,
    timeframes
  },
  data() {
    return {
      channel: {}
    };
  },
  computed: {
    mappedToSelected() {
      let copy = clone(this.channel);
      copy.selected = true;
      copy.cheapestTimeFrame = ChannelApi.getCheapestTimeFrame(copy);
      copy.cheapestTimeFrame.selected = true
      copy.timeFrame = [copy.cheapestTimeFrame]
      return [copy]
    }
  },
  async created() {
    this.channel = await ChannelApi.show({
      channelId: this.$route.params.id
    });
  }
};
</script>
<style lang="css">
</style>