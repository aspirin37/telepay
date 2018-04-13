<template src="./index.html"></template>
<script>
import { mapState } from 'vuex';
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
  computed: {
    ...mapState(['user'])
  },
  methods: {
    offerTime: ChannelApi.offerTime,
    async getList() {
      let { items, total } = await ChannelApi.list();

      items.forEach(ch => {
        ch.cheapestOffer = ChannelApi.getCheapestOffer(ch);
        ch.showOrders = false;
      });

      this.channels = items;
    },
    toggleOrders(ch) {
      if (ch.postOrders && ch.postOrders.length) {
        ch.showOrders = !ch.showOrders;
      }
    }
  }
};
</script>
