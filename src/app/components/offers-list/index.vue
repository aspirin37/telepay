<template src="./index.html"></template>
<script>
import dateInput from '@components/date-input';
import { ChannelApi, OfferApi } from '@services/api';
import { clone } from '@utils/clone';

export default Vue.extend({
  components: { dateInput },
  data() {
    return {
      weeksPlus: 0,
      offer: {
        weekDay: [],
        hour: '',
        minute: '',
        price: 100,
        inTopHours: '',
        inFeedHours: '',
        isAutopost: false
      },
      time: '',
      inFeedConditions: [{ name: 24 }, { name: 48 }],
      inTopConditions: [{ name: 1 }, { name: 2 }],
      offersToRemove: [],
      offers: this.channel.channelOffer || [],
      selectedWeekday: moment().weekday()
    };
  },
  watch: {
    time(val) {
      let arr = val.split(':');
      this.offer.hour = +arr[0];
      this.offer.minute = +arr[1];
    },
    channel(val) {
      this.offers = this.channel.channelOffer || [];
    }
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
    configs() {
      return this.$store.state.configs;
    },
    filteredOffers() {
      return this.offers.filter(offer => offer.weekDay === this.selectedWeekday).sort((a, b) => a.hour - b.hour);
    }
  },
  props: {
    channel: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  destroyed() {
    if (this.offersToRemove.length) {
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
    },
    addOffer() {
      let copy = clone(this.offer);
      copy.price *= 100;
      copy.channelId = this.channel.channelId;
      copy.weekDay = [this.selectedWeekday];
      OfferApi.create(copy)
        .then(res => {
          this.clearFields();
          this.$root.$emit('addedChannelOffer');
        })
        .catch(err => console.log(err));
    },
    clearFields() {
      setTimeout(() => {
        this.offer = {
          weekDay: [],
          hour: '',
          minute: '',
          price: 1,
          inTopHours: '',
          inFeedHours: ''
        };
        this.time = '';
      });
    }
  }
});
</script>
