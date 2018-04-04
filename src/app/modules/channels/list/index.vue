<template src="./index.html"></template>
<script>
import { ChannelApi } from '@services/api';
import avatar from '@components/avatar';
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
    offerTime: ChannelApi.offerTime,
    async deleteChannel(channel) {
      let swalOut = await swal({
        title: `Вы уверены что хотите удалить канал ${channel.title}?`,
        text: 'Это действие нельзя будет отменить',
        confirmButtonText: 'Да, удалить!'
      });

      if (swalOut && !swalOut.dismiss && swalOut.value) {
        ChannelsApi.delete(channel.id);
      }
    }
  }
};
</script>
