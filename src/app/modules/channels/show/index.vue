<template >
  <div class="container py-3">
   <h2 class="text-secondary my-4">Просмотр канала
        <router-link tag="small"
            :to="{name:'catalog'}"
            class="float-right pointer">
            <i class="fa fa-lg fa-chevron-left pt-1"></i> Назад</router-link>
    </h2>
    <div class="row mt-4"
        v-if="channel">
        <div class="col-2 ">
            <avatar :src="'/images/channels/'+channel.telegramId+'/'+channel.photoId+'.jpg'"
                style="max-width: 200px; max-height: 200px;"
                :circle="true" />
        </div>
        <div class="col-8">
            <h4>{{channel.title}}
                <small v-if="channel.telegramId">подписчиков: {{channel.subscriberCount | cutKilo}}</small>
            </h4>
            <p>Подтвержден: {{channel.isBotApproved?'Да':'Нет'}}</p>
            <p v-html="$options.filters.parseLinks(channel.description,'Нет описания')"></p>
        </div>
       
        
    </div>
        <h2 class="text-center">Рекламные предложения</h2>

    <timeframes v-if="channel && channel.channelId"
        :channel="channel"></timeframes>
  </div>
</template>

<script>
import { ChannelApi } from '@services/api';
import avatar from '@components/avatar';
import timeframes from '@components/timeframes';
import onOff from 'vue-on-off';
export default {
  components: { avatar, onOff, timeframes },
  data() {
    return {
      channel: {}
    };
  },
  async created() {
    this.channel = await ChannelApi.show({ channelId: this.$route.params.id });
  }
};
</script>

<style lang="css">

</style>
