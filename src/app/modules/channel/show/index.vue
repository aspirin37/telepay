<template lang="html">
  <div class="container py-3">
    <div class="col-2">
      {{ channel.title }}
    </div>
    <div class="col-4">
      {{ channel.description }}
    </div>
  </div>
</template>

<script>
import { ChannelApi } from '@services/api';

export default {
  data() {
    return {
      channel: {}
    }
  },
  async created() {
    this.channel = await ChannelApi.show({ channelId: this.$route.params.id });
  }
}
</script>

<style lang="css">
</style>
