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
        date: '',
        time: ''
      },
      selectedCategory: '',
      categories: [{
        name: 'Первая категория',
        value: 1
      },
      {
        name: 'Вторая категория',
        value: 2
      },
      {
        name: 'Третья категория',
        value: 3
      },
      {
        name: 'Четвертая категория',
        value: 4
      },
      {
        name: 'Пятая категория',
        value: 5
      }],
      channels: [],
      configs: {
        date: {
          dateFormat: "d.m.Y",
          defaultDate: new Date()
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
  async created() {
    let { items, total } = await CatalogApi.list();
    console.log(items);
    // this.channels = items;
  },
  template
});
</script>
