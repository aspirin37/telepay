<template lang="html">
</template>

<script>
import { ChannelApi } from '@services/api';
export default {
  created() {
    ChannelApi.delete({ channelId: this.$route.params.id }).then(res => {
      this.$router.replace({ name: 'channel.list' });
    })
  }
}
</script>
