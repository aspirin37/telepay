<template lang="html">
  <div class="d-flex flex-column">
    <div class="d-flex bg-light py-3 channel channel_header w-100">
      <div class="col-1 d-flex justify-content-around align-items-center" v-if="showFirstCol">
        <norm-checkbox />
        <i class="fa fa-star" aria-hidden="true"></i>
      </div>
      <div class="col-3">Канал</div>
      <div class="col-3">Описание</div>
      <div class="col-2">Подписчиков</div>
      <div class="col-2">Вовлеченность</div>
    </div>
    <channel v-for="(channel, i) in channels" :data="channel" :key="i" :show-last-col="showLastCol" :show-first-col="showFirstCol" />
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
      default: () => []
    },
    showFirstCol: {
      type: Boolean,
      default: true
    },
    showLastCol: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="css">

</style>
