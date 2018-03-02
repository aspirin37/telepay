<script>
import template from './index.html';
import selectr from 'selectr-th';
import channels from '@components/channels';
import normSelect from '@components/select';
import normSearchInput from '@components/search-input';
import normCheckbox from '@components/checkbox';
export default {
  components: { selectr, channels, normSelect, normCheckbox, normSearchInput },
  data() {
    return {
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
      channels: [{
        name: 'Первый канал',
        about: 'Это первый канал',
        subscribers: 20000,
        er: 20,
        price: 3000,
        like: false,
        selected: false,
        category: 'Первая категория'
      },
      {
        name: 'Второй канал',
        about: 'Это второй канал Это второй канал',
        subscribers: 40000,
        er: 40,
        price: 6000,
        like: true,
        selected: false,
        category: 'Вторая категория'
      },
      {
        name: 'Третий канал',
        about: 'Это третий канал Это третий канал Это третий канал',
        subscribers: 60000,
        er: 60,
        price: 9000,
        like: false,
        selected: true,
        category: 'Третья категория'
      }]
    }
  },
  template
}
</script>
