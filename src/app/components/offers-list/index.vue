<template src="./index.html"></template>
<script>
import { ChannelApi, OfferApi } from '@services/api';
export default Vue.extend({
  data() {
    return {
      weeksPlus: 0,
      offersToRemove: [],
      selectedWeekday: moment().weekday()
    };
  },
  computed: {
    days() {
      return new Array(7).fill(0).map((d, i) => {
        let date = moment().add(i + 7 * this.weeksPlus, 'day');
        return {
          date: date.format('DD MMMM'),
          weekDayText: date.format('dddd'),
          weekDayVal: date.weekday()
        };
      });
    },
    filteredOffers() {
      return this.offers.filter(offer => offer.weekDay - 1 === this.selectedWeekday).sort((a, b) => a.hour - b.hour);
    }
  },
  props: {
    offers: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  created() {},
  destroyed() {
    if (this.offersToRemove.length) {
      console.log(this.offersToRemove);
      this.offersToRemove.forEach(this.deleteOffer);
    }
  },
  methods: {
    offerTime: ChannelApi.offerTime,
    isRemoved(offer) {
      return this.offersToRemove.includes(offer);
    },
    removeOffer(offer) {
      this.offersToRemove.push(offer);
    },
    cancelOfferRemoval(offer) {
      let i = this.offersToRemove.indexOf(offer);
      if (~i) this.offersToRemove.splice(i, 1);
    },
    deleteOffer(offer) {
      OfferApi.delete({ channelId: offer.channelId, offerId: offer.channelOfferId });
    }
  }
});
</script>
