<template src="./index.html"></template>
<script>
import onOff from 'vue-on-off';
import avatar from '@components/avatar';
import normCheckbox from '@components/checkbox';
import checkboxGroup from '@components/checkbox/group.vue';
import dateInput from '@components/date-input';
import offersList from '@components/offers-list';
import { ChannelApi, OfferApi } from '@services/api';
import { clone } from '@utils/clone';

export default {
  components: { avatar, onOff, normCheckbox, checkboxGroup, dateInput, offersList },
  data() {
    return {
      channel: { isConfirmed: false },
      offer: {
        weekDay: [],
        hour: '',
        minute: '',
        price: 1,
        inTopHours: '',
        inFeedHours: '',
        isAutopost: false
      },
      time: '',
      inFeedConditions: [{ name: 24 }, { name: 48 }],
      inTopConditions: [{ name: 1 }, { name: 2 }]
    };
  },
  watch: {
    time(val) {
      let arr = val.split(':');
      this.offer.hour = +arr[0];
      this.offer.minute = +arr[1];
    }
  },
  created() {
    this.getChannelInfo();
  },
  computed: {
    config() {
      return this.$store.state.configs.time;
    }
  },
  methods: {
    async getChannelInfo() {
      this.channel = await ChannelApi.show({ channelId: this.$route.params.id });
    },

    addOffer() {
      let copy = clone(this.offer);
      copy.price *= 100;
      copy.channelId = this.channel.channelId;
      OfferApi.create(copy)
        .then(res => {
          this.clearFields();
          this.getChannelInfo();
        })
        .catch(err => console.log(err, 'ошибка'));
    },
    clearFields() {
      setTimeout(() => {
        this.offer = {
          weekDay: [],
          hour: '',
          minute: '',
          price: 1,
          inTopHours: '',
          inFeedHours: ''
        };
        this.time = '';
      });
    }
  }
};
</script>
