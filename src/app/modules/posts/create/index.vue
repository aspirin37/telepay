<script>
import template from './index.html';
import channels from '@components/channels/list';
import postPreview from '@components/post/preview';
import postForm from '@components/post/create-form';

export default {
  components: { channels, postPreview, postForm },
  data() {
    return {
      channel: [
        {
          name: 'Первый канал',
          about: 'Это первый канал',
          subscribers: 20000,
          er: 20,
          price: 3000,
          like: false,
          category: 'Первая категория'
        }
      ]
    };
  },
  template
};
</script>
