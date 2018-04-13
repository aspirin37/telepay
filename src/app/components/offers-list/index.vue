<template src="./index.html"></template>
<script>
import dateInput from '@components/date-input';
import { ChannelApi, OfferApi } from '@services/api';
import { clone } from '@utils/clone';
import { mapState } from 'vuex';

export default Vue.extend({
  components: { dateInput },
  data() {
    return {
      weeksPlus: 0,
      offer: {
        weekDay: [],
        hour: 12,
        minute: 0,
        price: 130,
        inTopHours: 1,
        inFeedHours: 24,
        removalHours: '1/24',
        isAutopost: false
      },
      initialPrice: 100,
      time: '12:00',
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
    },
    'offer.removalHours': function(val) {
      let arr = val.split('/');
      if (arr && arr.length) {
        this.offer.inTopHours = arr[0];
        this.offer.inFeedHours = arr[1];
      }
    }
  },
  computed: {
    ...mapState(['user', 'configs']),
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
    changeWeek(bool) {
      if (bool) {
        this.weeksPlus += 1;
      } else {
        if (this.weeksPlus >= 1) {
          this.weeksPlus -= 1;
        } else {
          this.weeksPlus = 0;
        }
      }
    },
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
        .catch(err => console.error(err));
    },
    clearFields() {
      setTimeout(() => {
        this.offer = {
          weekDay: [],
          hour: 12,
          minute: 0,
          price: 130,
          inTopHours: 1,
          inFeedHours: 24,
          removalHours: '1/24'
        };
        this.initialPrice = 100;
        this.time = '12:00';
      });
    }
  }
});
</script>
