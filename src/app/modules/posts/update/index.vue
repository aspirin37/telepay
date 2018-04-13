<script>
import { mapState } from 'vuex';
import { ChannelsApi, PostApi, CatalogApi } from '@services/api';

import template from './index.html';
// import channels from '@components/channels/list';
import postPreview from '@components/post-preview';
import { clone } from '@utils/clone';

export default {
  components: { postPreview },
  data() {
    return {
      channels: []
    };
  },
  async created() {
    let { items, total } = await CatalogApi.filter();
    this.channels = items.map(item => item.channelInfo).reduce((acc, item) => {
      acc = [...acc, ...item.channelOffer];
      return acc;
    }, []);
  },
  computed: {
    ...mapState({
      post: state => state.post
    }),
    imgs() {
      return this.$store.getters.getPostImages;
    }
  },
  watch: {
    imgs(n) {
      // console.log(n);
    }
  },
  methods: {
    create() {
      // console.log(this.mapProp(this.stringifyProp(this.post, 'buttons'), 'images'));
      return PostApi.create(this.mapProp(this.stringifyProp(this.post, 'buttons'), 'images'))
        .then(res => this.$router.push({ name: 'posts:list' }))
        .catch(err => console.error(err));
    },
    stringifyProp(obj, prop) {
      let newObj = clone(obj);
      newObj[prop] = JSON.stringify(newObj[prop]);
      return newObj;
    },
    mapProp(obj, prop) {
      let newObj = clone(obj);
      newObj[prop] = newObj[prop].map(item => item.file);
      return newObj;
    }
  },
  template
};
</script>
