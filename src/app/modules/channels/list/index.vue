<template lang="html">
  <div class="container py-3">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="text-medium-font mb-0">Мои каналы</h1>
      <router-link class="btn btn-primary" :to="{ name: 'channels:create' }">Добавить канал</router-link>
    </div>
    <channels :channels="channels" :show-last-col="true" :show-first-col="false" />
  </div>
</template>

<script>
import channels from '@components/channels/list';
import { ChannelsApi } from '@services/api';
export default {
  components: { channels },
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
      let pgn = await ChannelsApi.getList();
      this.channels = pgn.items;
    }
  }
};
</script>

<style lang="css">

</style>
