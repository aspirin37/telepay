<template lang="html">
  <div class="row py-4 list-item">
    <div class="col-1 text-center">
      <strong>{{ date }}</strong>
    </div>
    <div class="col-1 text-center">
      <strong>1/24</strong>
    </div>
    <div class="col-1 text-center">
      <strong>{{ price }}</strong>
    </div>
    <div class="col-3 d-flex justify-content-center align-items-center">
      <strong class="mr-3">Автопостинг</strong>
      <norm-switch :size="16"></norm-switch>
    </div>
    <div class="col-6 list-item__remove">
      <i class="fa fa-times" @click="remove"></i>
    </div>
  </div>
</template>

<script>
import { OfferApi } from '@services/api';
import normSwitch from '@components/switch';
export default {
  components: { normSwitch },
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  created() {
    console.log(this.data);
  },
  computed: {
    date() {
      return `${this.data.hour}:${this.data.minute}`;
    },
    price() {
      return `${this.data.price} ₽`;
    }
  },
  methods: {
    remove() {
      OfferApi.delete({ channelId: this.data.channelId, offerId: this.data.id }).then(res => {
        console.log(res);
      }).catch(err => console.log(err, 'err'));
    }
  }
}
</script>

<style lang="scss">
.list-item {
  border-bottom: 2px solid rgb(222,226,238);
  &__remove {
    .fa {
      cursor: pointer;
    }
  }
}
</style>
