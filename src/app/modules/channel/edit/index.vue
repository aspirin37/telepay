<script>
import template from './index.html';

import searchInput from '@components/search-input';
import channels from '@components/channels/list';
import avatar from '@components/avatar';
import normSwitch from '@components/switch';
import normCheckbox from '@components/checkbox';
import checkboxGroup from '@components/checkbox/group.vue';
import dateInput from '@components/date-input';
import offersList from '@components/offer/list';
import { ChannelApi, OfferApi } from '@services/api';
export default {
  components: { searchInput, channels, avatar, normSwitch, normCheckbox, checkboxGroup, dateInput, offersList },
  data() {
    return {
      channel: {},
      offer: {
        weekDay: [],
        hour: '',
        minute: '',
        price: 0,
        inFeedHours: '',
        isAutopost: false
      },
      time: '',
      conditions: [{ name: 24 }, { name: 48 }]
    }
  },
  created() {
    this.getChannelInfo(this.$route.params.id);
  },
  computed: {
    config() {
      return this.$store.state.configs.time;
    }
  },
  watch: {
    time(n) {
      let [ hour, minute ] = n.split(':');
      this.offer.hour = parseInt(hour);
      this.offer.minute = parseInt(minute);
    },
    'offer.inFeedHours': function(n) {
      if(n.name) {
        this.offer.inFeedHours = n.name;
      }
    },
    'offer.price': function(n) {
      if(typeof n === 'string') this.offer.price = parseInt(n);
    }
  },
  methods: {
    async getChannelInfo(channelId) {
      this.channel = await ChannelApi.show({ channelId });
    },
    addOffer() {
      OfferApi.create({ ...this.offer, channelId: this.channel.channelId })
        .then(res => this.clearFields())
        .catch(err => console.log(err, 'ошибка'))
    },
    clearFields() {
      this.offer.weekDay = [];
      this.offer.hour = '';
      this.offer.minute = '';
      this.offer.price = 0;
      this.offer.inFeedHours = '';
      this.offer.isAutopost = false;
      this.time = '';
    }
  },
  template
}
</script>
