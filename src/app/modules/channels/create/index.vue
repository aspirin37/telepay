<script>
import template from './index.html';
import selectr from 'selectr-th';
import channels from '@components/channels/list';
export default {
  components: { selectr, channels },
  data() {
    return {
      selectedCategory: '',
      categories: [],
      channels: [],
      channel: {}
    };
  },
  template
};
</script>

<style lang="css">

</style>
