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
        time: '',
        images: []
      },
      configs: {
        date: {
          dateFormat: "d.m.Y"
        },
        time: {
          enableTime: true,
          noCalendar: true,
          dateFormat: "H:i",
          time_24hr: true
        }
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
