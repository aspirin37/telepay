<template lang="html">
  <div class="container py-3">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="text-medium-font mb-0">Мои каналы</h1>
      <router-link v-if="channels.length" class="btn btn-primary" :to="{ name: 'channel.create' }">Добавить канал</router-link>
    </div>
    <channels v-if="channels.length" :channels="channels" :show-for-owner="true" />
    <h4 v-else class="text-center text-medium-font">
      Вы еще не добавили ни одного канала<br>
      <router-link class="btn btn-primary my-3" :to="{ name: 'channel.create' }">Добавить канал</router-link>
      </h4>
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
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      let { items, total } = await ChannelApi.list();
      this.channels = items;
    }
  }
};
</script>
