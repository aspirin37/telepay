<template src="./index.html"></template>
<script>
import onOff from 'vue-on-off';
import avatar from '@components/avatar';
// import timeframes from '@components/timeframes/fake';
import plural from '@utils/plural';
import { ChannelApi, TimeFrameApi } from '@services/api';

export default {
  components: {
    avatar,
    onOff,
    // timeframes
  },
  data() {
    return {
      channel: {
        isAutopost: undefined
      },
      showTimeframes: false,
      editingConditions: false,
      timeframesData: {
        postCount: null,
        postPrice: null,
        conditions: '24',
      }
    };
  },
  watch: {
    'channel.isAutopost': function(isAutopost, oldval) {
      if (this.channel.channelId && typeof oldval !== 'undefined' && typeof isAutopost !== 'undefined') {
        ChannelApi.edit(this.channel.channelId, { isAutopost });
      }
    },
  },
  created() {
    this.getChannelInfo();
    this.$root.$on('addedChannelTimeFrame', this.getChannelInfo);

  },
  destroyed() {
    this.$root.$off('addedChannelTimeFrame', this.getChannelInfo);
  },
  computed: {
    mappedTimeframes() {
      return (this.channel && this.channel.timeFrame) || [];
    },
    hasTimeframes() {
      return this.channel && this.channel.timeFrame && this.channel.timeFrame.length
    },
    inFeedHours() {
      return this.timeframesData.conditions === 'never' ? null : this.timeframesData.conditions;
    },
    maxPostsStr() {
      let {
        postCount,
        postPrice
      } = this.timeframesData;
      let totalPostsCount = postCount * 7;
      return `Максимум ${totalPostsCount} ${plural('пост',totalPostsCount)} - доход за неделю составит ${this.cutKiloCentToRub(totalPostsCount*postPrice)}`
    },
    dailyPostsStr() {
      let {
        postCount,
        postPrice,
        conditions
      } = this.timeframesData;
      return `${postCount} ${plural('пост',postCount)} в сутки, условия 1/${conditions=== 'never' ?'∞' : conditions} - ${this.cutKiloCentToRub(postPrice)}`
    }
  },
  methods: {
    cutKiloCentToRub(val) {
      return this.$options.filters.centToRub(this.$options.filters.cutKilo(val));
    },
    async getChannelInfo() {
      this.channel = await ChannelApi.show({
        channelId: this.$route.params.id
      });

      if (this.hasTimeframes) {
        this.timeframesData.postCount = this.channel.timeFrame[0].postCount;
        this.timeframesData.postPrice = this.channel.timeFrame[0].price / 100;
        this.timeframesData.conditions = this.channel.timeFrame[0].inFeedHours || 'never';
      }
      this.editingConditions = false
    },

    async saveGlobalTimeFrames() {
      if (this.channel.timeFrame.length) {
        await Promise.all(this.channel.timeFrame.map(tf => TimeFrameApi.delete(tf.timeFrameId)));
      }

      await TimeFrameApi.create({
        channelId: this.channel.channelId,
        postCount: this.timeframesData.postCount,
        startPeriodTime: '00:00',
        endPeriodTime: '23:00',
        price: this.timeframesData.postPrice * 100,
        weekDays: [1, 2, 3, 4, 5, 6, 7],
        inTopHours: 1,
        inFeedHours: this.inFeedHours,
      });
      this.getChannelInfo()
    }
  }
};
</script>