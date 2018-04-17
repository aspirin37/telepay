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
        timeFrom: '10:00',
        timeTo: '22:00',
        erFrom: 0,
        erTo: 100,
        weekDay: moment().weekday(),
        subscribersTo: 1000000,
        subscribersFrom: 0,
        priceTo: 100000,
        priceFrom: 0,
        text: ''
      },
      publishDate: moment(),
      filterConditions: '1/24',
      // weekDays: ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
      categories: [],
      channels: [],
      conditions: [
        { name: '1/24' },
        { name: '2/24' },
        { name: '3/24' },
        { name: '1/48' },
        { name: '2/48' },
        { name: '3/48' },
        { name: '1/72' },
        { name: '2/72' },
        { name: '3/72' }
      ],
      showFilters: false
    };
  },
  created() {
    this.getCategories();
    this.getChannels(this.filter);
  },
  watch: {
    filterConditions(val) {
      if (!val || !val.name) return;
      let arr = val.name.split('/');
      if (arr && arr.length) {
        this.filter.inTopHours = arr[0];
        this.filter.inFeedHours = arr[1];
      }
    },
    filter: {
      handler(val) {
        clearTimeout(this.debounceTimeout);
        this.debounceTimeout = setTimeout(this.getChannels, 1000, val);
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
    toggleFilters() {
      this.showFilters = !this.showFilters;
    },
    async getCategories() {
      let { items, count } = await CatalogApi.list();
      this.categories = items;
    },
    async getChannels(params = {}) {
      clearTimeout(this.debounceTimeout);
      let copy = clone(params);
      copy.priceFrom *= 100;
      copy.priceTo *= 100;
      if (copy.category) {
        copy.categoryId = copy.category.categoryId;
        delete copy.category;
      }
      let { items, count } = await CatalogApi.filter(copy);

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
