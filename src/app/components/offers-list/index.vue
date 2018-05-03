<template src="./index.html"></template>
<script>
import dateInput from '@components/date-input';
import { ChannelApi, TimeFrameApi } from '@services/api';
import { clone } from '@utils/clone';
import { mapState } from 'vuex';

export default Vue.extend({
  components: { dateInput },
  data() {
    return {
      weeksPlus: 0,
      timeFrame: {
        weekDay: [],
        hour: 12,
        minute: 0,
        price: 130,
        inTopHours: 1,
        inFeedHours: 24,
        isAutopost: false
      },
      removalHours: '1/24',

      initialPrice: 100,
      time: '12:00',
      inFeedConditions: [{ name: 24 }, { name: 48 }],
      inTopConditions: [{ name: 1 }, { name: 2 }],
      timeFramesToRemove: [],
      timeFrames: this.channel.channelTimeFrame || [],
      selectedWeekday: moment().weekday()
    };
  },
  watch: {
    time(val) {
      let arr = val.split(':');
      this.timeFrame.hour = +arr[0];
      this.timeFrame.minute = +arr[1];
    },
    channel(val) {
      this.timeFrames = this.channel.channelTimeFrame || [];
    },
    removalHours(val) {
      let arr = val.split('/');
      if (arr && arr.length) {
        this.timeFrame.inTopHours = arr[0];
        this.timeFrame.inFeedHours = arr[1];
      }
    }
  },
  computed: {
    ...mapState(['user', 'configs']),
    days() {
      return new Array(7).fill(0).map((d, i) => {
        let date = moment().add(i + 7 * this.weeksPlus, 'day');
        return {
          date: date.format('DD MMMM'),
          weekDayText: date.format('dddd'),
          weekDayVal: date.weekday()
        };
      });
    },
    filteredTimeFrames() {
      return this.timeFrames.filter(timeFrame => timeFrame.weekDay === this.selectedWeekday).sort((a, b) => a.hour - b.hour);
    }
  },
  props: {
    channel: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  destroyed() {
    if (this.timeFramesToRemove.length) {
      this.timeFramesToRemove.forEach(this.deleteTimeFrame);
    }
  },
  methods: {
    timeFrameDates: ChannelApi.timeFrameDates,
    changeWeek(bool) {
      if (bool) {
        this.weeksPlus += 1;
      } else {
        if (this.weeksPlus >= 1) {
          this.weeksPlus -= 1;
        } else {
          this.weeksPlus = 0;
        }
      }
    },
    isRemoved(timeFrame) {
      return this.timeFramesToRemove.includes(timeFrame);
    },
    removeTimeFrame(timeFrame) {
      this.timeFramesToRemove.push(timeFrame);
    },
    cancelTimeFrameRemoval(timeFrame) {
      let i = this.timeFramesToRemove.indexOf(timeFrame);
      if (~i) this.timeFramesToRemove.splice(i, 1);
    },
    deleteTimeFrame(timeFrame) {
      TimeFrameApi.delete({ channelId: timeFrame.channelId, timeFrameId: timeFrame.channelTimeFrameId });
    },
    addTimeFrame() {
      let copy = clone(this.timeFrame);
      copy.price *= 100;
      copy.channelId = this.channel.channelId;
      copy.weekDay = [this.selectedWeekday];
      TimeFrameApi.create(copy)
        .then(res => {
          this.clearFields();
          this.$root.$emit('addedChannelTimeFrame');
        })
        .catch(err => console.error(err));
    },
    clearFields() {
      setTimeout(() => {
        this.timeFrame = {
          weekDay: [],
          hour: 12,
          minute: 0,
          price: 130,
          inTopHours: 1,
          inFeedHours: 24
        };
        this.removalHours = '1/24';
        this.initialPrice = 100;
        this.time = '12:00';
      });
    }
  }
});
</script>
