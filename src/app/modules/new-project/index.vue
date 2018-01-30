<script>
import template from './index.html';
import channels from '@components/channels';
import projectPreview from '@components/project-preview';
import dateInput from '@components/date-input';
export default {
  components: { channels, projectPreview, dateInput },
  data() {
    return {
      picker: '',
      channel: [{
        name: 'Первый канал',
        about: 'Это первый канал',
        subscribers: 20000,
        er: 20,
        price: 3000,
        like: false,
        category: 'Первая категория'
      }]
    }
  },
  template
}
</script>

<style lang="css">
</style>
