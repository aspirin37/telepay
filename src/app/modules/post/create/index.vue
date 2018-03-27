<script>
import { mapState } from 'vuex';
import { ChannelApi, PostApi } from '@services/api';

import template from './index.html';
import channels from '@components/channels/list';
import postPreview from '@components/post/preview';
import postForm from '@components/post/create-form';
import { clone } from '@utils/clone';

export default {
  components: { channels, postPreview, postForm },
  data() {
    return {
      channels: []
    };
  },
  async created() {
    let { items, total } = await ChannelApi.list();
    this.channels = items;
  },
  computed: {
    ...mapState({
      post: state => state.post
    })
  },
  methods: {
    create() {
      console.log(this.post);
      return PostApi.create(this.stringifyProp(this.post, 'buttons'))
        .then(res => this.$router.push({ name: 'posts.list' }))
        .catch(console.log);
    },
    stringifyProp(obj, prop) {
      let newObj = clone(obj);
      newObj[prop] = JSON.stringify(newObj[prop]);
      return newObj;
    }
  },
  template
};
</script>
