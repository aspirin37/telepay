<template src="./index.html"></template>

<script>
import { mapGetters } from 'vuex';

import { CatalogApi, ChannelApi } from '@services/api';

import avatar from '@components/avatar';
import normCheckbox from '@components/checkbox';
import searchInput from '@components/search-input';
import dateInput from '@components/date-input';

import { clone } from '@utils/clone';

export default Vue.extend({
  components: { avatar, normCheckbox, searchInput, dateInput },
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
      channels: []
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
    configs() {
      return this.$store.state.configs;
    },
    selectedChannels() {
      return this.channels.reduce((sum, ch) => {
        let selectedOffers = ch.channelOffer.filter(offer => offer.selected);
        if (selectedOffers.length) {
          ch.channelOffer = selectedOffers;
          sum.push(ch);
        }
        return sum;
      }, []);
    }
  },
  methods: {
    async getChannels(params = {}) {
      let { items, count } = await CatalogApi.filter(params);
      this.channels = items.map(item => {
        Vue.set(item.channelInfo, 'showAllOffers', false);
        item.channelInfo.channelOffer = item.channelInfo.channelOffer.filter(offer => offer.weekDay - 1 === moment(params.date).weekday());

        item.channelInfo.cheapestOffer = ChannelApi.getCheapestOffer(item.channelInfo);
        item.channelInfo.channelOffer.forEach(offer => {
          Vue.set(offer, 'selected', false);
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
    },
    offerTime: ChannelApi.offerTime,
    selectChannel(ch) {
      ch.cheapestOffer.selected = !ch.cheapestOffer.selected;
    }
  }
});
</script>
