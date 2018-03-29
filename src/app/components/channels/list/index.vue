<template lang="html">
  <div class="d-flex flex-column">
    <div class="d-flex bg-light py-3 channel channel_header w-100">
      <div class="col-1 d-flex justify-content-around align-items-center" v-if="showForOwner">
        Запросы
      </div>
      <div class="col-1 d-flex justify-content-around align-items-center" v-if="!showForOwner">
        <i class="fa fa-star" aria-hidden="true"></i>
      </div>
      <div class="col-3">Канал</div>
      <div class="col-2">Описание</div>
      <div class="col-2">Подписчиков</div>
      <div class="col-1">Er</div>
      <div class="col-1">Условия</div>
      <div class="col-1">Цена</div>
      <div class="col-1" v-if="!showForOwner">Выбрать</div>
      <div class="col-1" v-if="showForOwner">Действия</div>
    </div>
    <channel v-for="(channel, i) in channels" :data="channel" :key="channel.id" :show-for-owner="showForOwner" @select-channel="selectChannelHandler" />
  </div>
</template>

<script>
import channel from '../list-item/index.vue';
import normCheckbox from '@components/checkbox';
export default {
  components: { channel, normCheckbox },
  props: {
    channels: {
      type: Array,
      default: () => ([])
    },
    showForOwner: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectedChannels: []
    }
  },
  watch: {
    'selectedChannels': function(n) {
      this.$store.commit('UPDATE_POST', { prop: 'offerId', value: n });
    }
  },
  methods: {
    selectChannelHandler(e) {
      this.selectedManager(e);
    },
    selectedManager(value) {
      if(this.selectedChannels.includes(value)) {
        this.selectedChannels = this.selectedChannels.filter(item => item !== value);
      } else {
        this.selectedChannels.push(value);
      }
    }
  }
}
</script>

<style lang="css">
</style>
