<template src="./index.html"></template>

<script>
import avatar from '@components/avatar';
import normCheckbox from '@components/checkbox';
import telestatLink from '@components/telestat-link';
export default {
  components: {
    avatar,
    telestatLink,
    normCheckbox
  },
  data() {
    return {
      selected: false,
      showAllOffers: false,
      cheapestOffer: {},
      weekDays: ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']
    };
  },
  props: {
    data: {
      type: Object
    },
    showForOwner: {
      type: Boolean,
      default: false
    }
  },
  created() {
    if (this.data.channelOffer && this.data.channelOffer.length) {
      if (this.data.channelOffer.length > 1) {
        this.cheapestOffer = this.data.channelOffer.sort((a, b) => a.price - b.price)[0];
        this.data.channelOffer = this.data.channelOffer.sort((a, b) => a.weekDay - b.weekDay);
      } else {
        this.cheapestOffer = this.data.channelOffer[0];
      }
    } else {
      this.cheapestOffer = {
        price: '-'
      };
    }
  },
  computed: {
    routeName() {
      return this.showForOwner ? 'channel.edit' : 'channel.show';
    }
  },
  methods: {
    changeHandler(e) {
      this.$emit('select-channel', this.data.channelOfferId);
    },
    calculateTime(offer) {
      if (offer.hour === undefined || offer.minute === undefined) return '-';
      let { hour, minute } = offer;

      if (hour < 10) hour = '0' + hour;
      if (minute < 10) minute = '0' + minute;
      return `${hour}:${minute}`;
    }
  }
};
</script>
