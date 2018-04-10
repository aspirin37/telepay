<template src="./index.html"></template>

<script>
import { mapState } from 'vuex';

import { CatalogApi, ChannelApi } from '@services/api';

import avatar from '@components/avatar';
import searchInput from '@components/search-input';
import dateInput from '@components/date-input';
import channelList from '@components/channel-list';

import { cloneWFn } from '@utils/clone';

export default Vue.extend({
  components: { avatar, searchInput, dateInput, channelList },
  data() {
    return {
      filter: {
        time: null,
        weekDay: moment().weekday(),
        subscribersTo: 1000000,
        subscribersFrom: 0,
        priceTo: 100000,
        priceFrom: 0,
        text: ''
      },
      publishDate: moment(),
      // weekDays: ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
      categories: [],
      channels: []
    };
  },
  created() {
    this.getChannels(this.filter);
  },
  watch: {
    filter: {
      handler(val) {
        this.getChannels(val);
      },
      deep: true
    },
    publishDate(val) {
      if (!(val instanceof moment)) {
        val = moment(val);
        return;
      }
      this.filter.weekDay = val.weekday();
    }
  },
  computed: {
    ...mapState(['configs']),
    selectedChannels() {
      return this.channels.filter(ch => ch.selected);
    },
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
          return offer.weekDay === params.weekDay;
        });
        return item.channelInfo;
      });
    }
  }
});
</script>
