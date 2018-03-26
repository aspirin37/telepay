<template lang="html">
  <div class="container py-3">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="text-medium-font mb-0">Мои каналы</h1>
      <router-link class="btn btn-primary" :to="{ name: 'channel.create' }">Добавить канал</router-link>
    </div>
    <channels :channels="channels" :show-for-owner="true" />
  </div>
</template>

<script>
import { ChannelApi } from '@services/api';

import channels from '@components/channels/list';
export default {
  components: { channels },
  data() {
    return {
      channels: []
    }
  },
  async created() {
    let { items, total } = await ChannelApi.list();
    console.log(items);
    this.channels = items;
  }
}
</script>
