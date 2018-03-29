<script>
import template from './index.html';
import { mapGetters } from 'vuex';

import { CatalogApi } from '@services/api';

import channels from '@components/channels/list';
import normCheckbox from '@components/checkbox';
import searchInput from '@components/search-input';
import dateInput from '@components/date-input';

import { clone } from '@utils/clone';

export default Vue.extend({
  components: { channels, normCheckbox, searchInput, dateInput },
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
        text: ''
      },
      categories: [],
      channels: []
    }
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
    }
  },
  methods: {
    async getChannels(params = {}) {
      let { items, count } = await CatalogApi.filter(params);
      this.channels = items.map(item => item.channelInfo);
    },
    handleSearch(obj) {
      let newFilter = this.matchWithCache(obj);
      this.getChannels(newFilter);
    },
    matchWithCache(obj) {
      let payload = {};
      for(let prop in this.cached) {
        if((obj[prop] !== undefined) && (this.cached[prop] !== obj[prop])) {
          payload[prop] = obj[prop];
        }
      }
      return payload;
    },
    cache(obj) {
      this.cached = clone(obj);
    }
  },
  template
});
</script>
