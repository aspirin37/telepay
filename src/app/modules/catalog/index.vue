<template src="./index.html"></template>

<script>
import { mapState } from 'vuex';

import { CatalogApi, ChannelApi } from '@services/api';

import avatar from '@components/avatar';
import searchInput from '@components/search-input';
import dateInput from '@components/date-input';
import channelList from '@components/channel-list';

import { clone } from '@utils/clone';

export default Vue.extend({
  components: { avatar, searchInput, dateInput, channelList },
  data() {
    return {
      filter: {
        weekDay: null,
        time: null,
        subscribersTo: 1000,
        subscribersFrom: 0,
        priceTo: 1000,
        priceFrom: 0,
        id: '',
        text: '',
        date: moment()
      },
      weekDays: ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
      categories: [],
      channels: [],
      selectedChannels: []
    };
  },
  created() {
    this.cache(this.filter);
    this.getChannels();
  },
  watch: {
    filter: {
      handler(n) {
        this.handleSearch(n);
      },
      deep: true
    }
  },
  computed: {
    ...mapState(['configs']),
    totalPrice() {
      return this.selectedChannels.reduce((sum, el) => {
        return sum + el.channelOffer.reduce((ofSum, offer) => ofSum + (offer.selected ? offer.price : 0), 0);
      }, 0);
    }
  },
  methods: {
    async getChannels(params = {}) {
      let { items, count } = await CatalogApi.filter(params);
      this.channels = items.map(item => {
        item.channelInfo.channelOffer = item.channelInfo.channelOffer.filter(offer => {
          if (!(this.filter.date instanceof moment)) {
            this.filter.date = moment(this.filter.date);
          }
          return offer.weekDay - 1 === this.filter.date.weekday();
        });
        return item.channelInfo;
      });
    },
    handleSearch(obj) {
      let newFilter = this.matchWithCache(obj);
      this.getChannels(newFilter);
    },
    matchWithCache(obj) {
      let payload = {};
      for (let prop in this.cached) {
        if (obj[prop] !== undefined && this.cached[prop] !== obj[prop]) {
          payload[prop] = obj[prop];
        }
      }
      return payload;
    },
    cache(obj) {
      this.cached = clone(obj);
    }
  }
});
</script>
