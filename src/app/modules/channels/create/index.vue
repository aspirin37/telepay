<script>
import template from './index.html';
import selectr from 'selectr-th';
import channels from '@components/channels/list';
export default {
  components: { selectr, channels },
  data() {
    return {
      selectedCategory: '',
      categories: ['Первая категория', 'Вторая категория', 'Третья категория'],
      channels: [{
        name: 'Первый канал',
        about: 'Это первый канал',
        subscribers: 20000,
        er: 20,
        price: 3000,
        like: false,
        category: 'Первая категория'
      },
      {
        name: 'Второй канал',
        about: 'Это второй канал Это второй канал',
        subscribers: 40000,
        er: 40,
        price: 6000,
        like: true,
        category: 'Вторая категория'
      },
      {
        name: 'Третий канал',
        about: 'Это третий канал Это третий канал Это третий канал',
        subscribers: 60000,
        er: 60,
        price: 9000,
        like: false,
        category: 'Третья категория'
      }]
    }
  },
  template
}
</script>

<style lang="css">
</style>
