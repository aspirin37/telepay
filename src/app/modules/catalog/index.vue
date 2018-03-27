<script>
import template from './index.html';

import { CatalogApi } from '@services/api';

import channels from '@components/channels/list';
import normCheckbox from '@components/checkbox';
import searchInput from '@components/search-input';
import dateInput from '@components/date-input';
export default Vue.extend({
  components: { channels, normCheckbox, searchInput, dateInput },
  data() {
    return {
      filter: {
        weekDay: '',
        time: '',
        subscribersTo: 1000,
        subscribersFrom: 0,
        priceTo: 1000,
        priceFrom: 0,
        id: '',
        text: ''
      },
      categories: [],
      channels: [],
      configs: {
        date: {
          dateFormat: "d.m.Y"
        },
        time: {
          enableTime: true,
          noCalendar: true,
          dateFormat: 'H:i',
          time_24hr: true
        }
      }
    }
  },
  created() {
    this.getCategories();
  },
  methods: {
    async getCategories() {
      let { items, count } = await CatalogApi.list();
      this.categories = items.map((item, i) => ({ value: i, name: item.categoryName }));
    }
  },
  template
});
</script>
