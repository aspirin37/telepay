<template src="./index.html"></template>
<script>
import onOff from 'vue-on-off';
import avatar from '@components/avatar';
import searchInput from '@components/search-input';
import plural from '@utils/plural';
import { ChannelApi, CatalogApi, TimeFrameApi } from '@services/api';

export default {
    components: {
        avatar,
        onOff,
        searchInput
    },
    data() {
        return {
            channel: {
                isAutopost: undefined
            },
            categories: [],
            showTimeframes: false,
            editingConditions: false,
            timeframesData: {
                postCount: null,
                postPrice: null,
                conditions: '',
            },
            errors: {
                postCount: false,
                postPrice: false,
                conditions: false,
            },

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
        this.getCategories()
        this.$root.$on('addedChannelTimeFrame', this.getChannelInfo);
    },
    destroyed() {
        this.$root.$off('addedChannelTimeFrame', this.getChannelInfo);
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
        mappedTimeframes() {
            return (this.channel && this.channel.timeFrame) || [];
        },
        hasTimeframes() {
            return this.channel && this.channel.timeFrame && this.channel.timeFrame.length
        },
        inFeedHours() {
            return this.timeframesData.conditions === 'never' ? null : this.timeframesData.conditions;
        },
        changeCategoryText() {
            return `Здравствуйте, я хочу изменить категорию моего канала @${this.channel.username}, по причине ...`
        },
        maxPostsStr() {
            let {
                postCount,
                postPrice
            } = this.timeframesData;
            let totalPostsCount = postCount * 7;
            return `Максимум за неделю: <span class="h5">${totalPostsCount}</span> ${plural('пост',totalPostsCount)} - доход: <span class="h5">${this.cutKiloCentToRub(totalPostsCount*postPrice)}</span>`
        },
        dailyPostsStr() {
            let {
                postCount,
                postPrice,
                conditions
            } = this.timeframesData;
            return `<span class="h5">${postCount}</span> ${plural('пост',postCount)} в сутки, каждый по <span class="h5">${this.cutKiloCentToRub(postPrice)}</span><br>
            <span class="h5">1</span> час в топе, присутствие в канале - <span class="h5">${conditions=== 'never' ?'∞' : conditions+'ч'}</span>`
        }
    },
    methods: {
        async getCategories() {
            let { items, total } = await CatalogApi.list();
            this.categories = items;
        },
        async handleSelect(item) {
            if (item.selected) {
                console.log('add black', item.categoryId)
                await CatalogApi.blacklistAdd({ channelId: this.channel.channelId, categoryIds: [item.categoryId] })
            } else {
                console.log('remove black', item.categoryId)
                await CatalogApi.blacklistRemove({ channelId: this.channel.channelId, categoryIds: [item.categoryId] })
            }
        },
        fixPostCount() {
            if (!this.timeframesData.postCount) return
            if (this.timeframesData.postCount > 24) this.timeframesData.postCount = 24;
            if (this.timeframesData.postCount < 1) this.timeframesData.postCount = 1;
        },
        fixPostPrice() {
            if (!this.timeframesData.postPrice) return
            if (this.timeframesData.postPrice > 1e6) this.timeframesData.postPrice = 1e6;
            if (this.timeframesData.postPrice < 1) this.timeframesData.postPrice = 1;
        },
        cutKiloCentToRub(val) {
            return this.$options.filters.centToRub(this.$options.filters.cutKilo(val));
        },
        async getChannelInfo() {
            this.channel = await ChannelApi.show({
                channelId: this.$route.params.username
            });

            if (this.channel && this.channel.userId !== this.user.userId) {
                this.$router.replace({ name: 'channels:show', params: { username: this.$route.params.username } })
            }

            if (this.hasTimeframes) {
                this.timeframesData.postCount = this.channel.timeFrame[0].postCount;
                this.timeframesData.postPrice = this.channel.timeFrame[0].price / 100;
                this.timeframesData.conditions = this.channel.timeFrame[0].inFeedHours || 'never';
            }

            this.editingConditions = !this.channel.timeFrame.length
        },

        async saveGlobalTimeFrames() {
            if (!this.timeframesData.postCount) this.errors.postCount = true
            if (!this.timeframesData.postPrice) this.errors.postPrice = true
            if (!this.timeframesData.conditions) this.errors.conditions = true

            if (Object.keys(this.errors).some(key => this.errors[key])) {
                return;
            }


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