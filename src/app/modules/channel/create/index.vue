<script>
import template from './index.html';

import { ChannelApi, CatalogApi, OfferApi } from '@services/api';

import searchInput from '@components/search-input';
import channels from '@components/channels/list';
import avatar from '@components/avatar';
import normSwitch from '@components/switch';
import normCheckbox from '@components/checkbox';
import checkboxGroup from '@components/checkbox/group.vue';
import dateInput from '@components/date-input';
import offersList from '@components/offer/list';

export default {
  components: { searchInput, channels, avatar, normSwitch, normCheckbox, checkboxGroup, dateInput, offersList },
  data() {
    return {
      channel: {
        username: '',
        category: ''
      },
      categories: [],
    }
  },
  created() {
    this.getCategories();
  },
  computed: {
    config() {
      return this.$store.state.configs.time;
    }
  },
  methods: {
    async getCategories() {
      let { items, total } = await CatalogApi.list();
      this.categories = items;
    },
    add() {
      ChannelApi.create({ username: this.channel.username, category: this.channel.category.categoryId }).then(res => {
        this.channel.username = '';
        this.channel.category = '';
        this.$router.push({ name: 'channel.list' });
      });
    }
  },
  template
}
</script>
