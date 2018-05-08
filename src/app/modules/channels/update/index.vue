<template src="./index.html"></template>
<script>
import onOff from 'vue-on-off';
import avatar from '@components/avatar';
import timeframes from '@components/timeframes/fake';
import plural from '@utils/plural';
import {
    ChannelApi,
    TimeFrameApi
} from '@services/api';

export default {
    components: {
        avatar,
        onOff,
        timeframes
    },
    data() {
        return {
            channel: {
                isAutoPost: false
            },
            showTimeframes: false,
            priceDaily: 1000,
            postsDaily: 5,
            timeframesData: {
                postCount: 5,
                postPrice: 1000,
                conditions: '24',
            }
        };
    },
    watch: {
        'channel.isAutoPost': function(isAutoPost, oldval) {
            if (this.channel.channelId && typeof oldval !== 'undefined' && typeof isAutoPost !== 'undefined') {
                ChannelApi.edit(this.channel.channelId, {
                    isAutoPost
                });
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
            return `${postCount} ${plural('пост',postCount)} в сутки, условия 1/${conditions} - ${this.cutKiloCentToRub(postPrice)}`
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
        },

        async saveGlobalTimeFrames() {
            if (this.channel.timeFrame.length) {
                await Promise.all(this.channel.timeFrame.map(tf => TimeFrameApi.delete(tf.timeFrameId)));
            }
            await TimeFrameApi.create({
                channelId: this.channel.channelId,
                postCount: this.timeframesData.postCount,
                startPeriodTime: 0,
                endPeriodTime: 23,
                price: this.timeframesData.postPrice * 100,
                weekDays: [1, 2, 3, 4, 5, 6, 7],
                inTopHours: 1,
                inFeedHours: this.timeframesData.conditions,
            });
            this.getChannelInfo()
        }
    }
};
</script>