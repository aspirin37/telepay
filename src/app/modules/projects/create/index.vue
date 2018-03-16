<script>
import template from './index.html';
import channels from '@components/channels/list';
import projectPreview from '@components/project/preview';
import projectForm from '@components/project/create-form';

export default {
  components: { channels, projectPreview, projectForm },
  data() {
    return {
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
