<template src="./index.html"></template>
<script>
import { ChannelApi } from '@services/api';
import avatar from '@components/avatar';
import TelestatLink from '@components/telestat-link';

export default {
  components: { avatar },
  data() {
    return {
      channels: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      let { items, total } = await ChannelApi.list();

      items.forEach(ch => {
        ch.cheapestOffer = ChannelApi.getCheapestOffer(ch);
      });

      this.channels = items;
    },
    offerTime: ChannelApi.offerTime
  }
};
</script>
