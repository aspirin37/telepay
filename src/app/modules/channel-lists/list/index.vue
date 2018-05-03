<template src="./index.html"></template>
<script>
import { ChannelListsApi } from '@services/api';
export default Vue.extend({
  data() {
    return {
      channelLists: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      this.channelLists = await ChannelListsApi.getList();
    }
  }
});
</script>
