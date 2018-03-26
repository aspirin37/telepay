<script>
import { ChannelApi } from '@services/api';
import template from './index.html';
import searchInput from '@components/search-input';
import channels from '@components/channels/list';
export default {
  components: { searchInput, channels },
  data() {
    return {
      channel: {
        title: '',
        description: '',
        username: '',
        category: '',
      },
      categories: [{ name: 'Первая категория', value: 1 }, { name: 'Вторая категория', value: 2 }, { name: 'Третья категория', value: 3 }]
    }
  },
  methods: {
    add() {
      console.log(this.channel);
      ChannelApi.create(this.channel).then(res => {
        this.title = '';
        this.description = '';
        this.username = '';
        this.category = '';
        this.$router.push({ name: 'channel.list' });
      });
    }
  },
  template
}
</script>
