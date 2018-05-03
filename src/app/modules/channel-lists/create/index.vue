<template src="./index.html"></template>
<script>
import channelList from '@components/channel-list';
import { ChannelListsApi } from '@services/api';
export default Vue.extend({
  components: { channelList },
  data() {
    return { list: {}, channels: [] };
  },
  created() {},
  methods: {}
});
</script>
