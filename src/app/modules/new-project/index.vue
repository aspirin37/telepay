<script>
import template from './index.html';
import channels from '@components/channels';
import projectPreview from '@components/project-preview';
import dateInput from '@components/date-input';
import textareaInput from '@components/textarea-input';
export default {
  components: { channels, projectPreview, dateInput, textareaInput },
  data() {
    return {
      post: {
        channel: 'chagram',
        message: '',
        date: '',
        images: []
      },
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
  computed: {
    postDate() {
      return new Date(this.post.date).toLocaleDateString();
    }
  },
  methods: {
    addImageHandler(image) {
      this.post.images.push(image);
    },
    removeImageHandler(index) {
      let filteredImages = this.post.images.filter((img, i) => i !== index);
      this.$set(this.post, 'images', filteredImages);
    }
  },
  template
}
</script>

<style lang="css">
</style>
