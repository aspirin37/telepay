<template src="./index.html"></template>
<script>
import onOff from 'vue-on-off';
import avatar from '@components/avatar';
import heading from '@components/heading';
import searchInput from '@components/search-input';
import plural from '@utils/plural';
import { ChannelApi, CatalogApi, TimeFrameApi } from '@services/api';

export default {
    components: {
        avatar,
        onOff,
        searchInput,
        heading
    },
    data() {
        return {
            channel: {
                isAutopost: undefined
            },
            cache: {},
            categories: [],
            showTimeframes: false,
            editingConditions: false,
            timeframesData: {
                postCount: null,
                postPrice: null,
                conditions: ''
            },
            errors: {
                postCount: false,
                postPrice: false,
                conditions: false
            }
        };
    },
    watch: {
        'channel.isAutopost': function(isAutopost, oldval) {
            if (this.channel.channelId && typeof oldval !== 'undefined' && typeof isAutopost !== 'undefined') {
                ChannelApi.edit(this.channel.channelId, { isAutopost });
            }
        }
    },
    created() {
        this.getData();
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
            return this.channel && this.channel.timeFrame && this.channel.timeFrame.length;
        },
        inFeedHours() {
            return this.timeframesData.conditions === 'never' ? null : this.timeframesData.conditions;
        },
        changeCategoryText() {
            return `Здравствуйте, я хочу изменить категорию моего канала @${this.channel.username}, по причине ...`;
        },
        maxPostsStr() {
            let { postCount, postPrice } = this.timeframesData;
            let totalPostsCount = postCount * 7;
            return `Максимум за неделю: <span class="h5">${totalPostsCount}</span> ${this.pluralizePost(
        totalPostsCount
      )} - доход: <span class="h5">${this.cutKiloCentToRub(totalPostsCount * postPrice)}</span>`;
        },
        dailyPostsStr() {
            let { postCount, postPrice, conditions } = this.timeframesData;
            return `<span class="h5">${postCount}</span> ${this.pluralizePost(
        postCount
      )} в сутки, каждый по <span class="h5">${this.cutKiloCentToRub(postPrice)}</span><br>
            <span class="h5">1</span> час в топе, присутствие в канале - <span class="h5">${
              conditions === 'never' ? '∞' : conditions + 'ч'
            }</span>`;
        }
    },
    methods: {
        async getData() {
            await this.getChannelInfo();
            await this.getCategories();
        },
        async getCategories() {
            let { items, total } = await CatalogApi.list();
            items.sort((a, b) => (a.name === '18+' || a.name === 'Азартные игры' ? -1 : 1));
            this.categories = items;
            if (this.channel.blacklist && this.channel.blacklist.length) {
                this.categories.forEach(cat => {
                    if (this.channel.blacklist.find(c => cat.categoryId === c.categoryId)) {
                        cat.selected = true;
                    }
                });
            }
        },
        pluralizePost: plural('пост', ['ов', '', 'а']),
        async handleSelect(item) {
            if (item.selected) {
                await CatalogApi.blacklistAdd({ channelId: this.channel.channelId, categoryIds: [item.categoryId] });
            } else {
                await CatalogApi.blacklistRemove({ channelId: this.channel.channelId, categoryIds: [item.categoryId] });
            }
        },
        fixPostCount() {
            if (!this.timeframesData.postCount) return;
            if (this.timeframesData.postCount > 24) this.timeframesData.postCount = 24;
            if (this.timeframesData.postCount < 1) this.timeframesData.postCount = 1;
        },
        fixPostPrice() {
            if (!this.timeframesData.postPrice) return;
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
                this.$router.replace({ name: 'channels:show', params: { username: this.$route.params.username } });
            }

            if (this.hasTimeframes) {
                let { postCount, price, inFeedHours } = ChannelApi.getCheapestTimeFrame(this.channel);
                this.cache = { postCount, postPrice: price, inFeedHours };
                this.timeframesData.postCount = postCount;
                this.timeframesData.postPrice = price / 100;
                this.timeframesData.conditions = inFeedHours || 'never';
            }

            this.editingConditions = !this.channel.timeFrame.length;


        },
        async deleteTimeFrames(alert) {
            let swalOut;
            if (alert) {
                swalOut = await swal({
                    title: 'Вы уверены что хотите удалить рекламные предложения канала?',
                    html: 'Канал не будет виден в каталоге.<br>Все посты на этом канале <b>ожидающие постинга</b> будут опубликованы.<br>Все посты <b>ожидающие подтверждения</b> будут отклонены.',
                    confirmButtonText: 'Да, удалить!'
                });
            }
            if (this.channel.timeFrame.length && ((swalOut && !swalOut.dismiss) || !swalOut)) {
                await Promise.all(this.channel.timeFrame.map(tf => TimeFrameApi.delete(tf.timeFrameId)));
                this.channel.timeFrame = [];
                this.timeframesData = {
                    postCount: null,
                    postPrice: null,
                    conditions: ''
                }
                this.getChannelInfo()
            }
        },
        async saveGlobalTimeFrames() {
            if (!this.timeframesData.postCount) this.errors.postCount = true;
            if (!this.timeframesData.postPrice) this.errors.postPrice = true;
            if (!this.timeframesData.conditions) this.errors.conditions = true;

            if (Object.keys(this.errors).some(key => this.errors[key])) {
                return;
            }

            if (
                this.timeframesData.postCount === this.cache.postCount &&
                this.timeframesData.postPrice === this.cache.postPrice / 100 &&
                this.inFeedHours === this.cache.inFeedHours
            ) {
                this.editingConditions = false;
                return;
            }
            await this.deleteTimeFrames(false);

            await TimeFrameApi.create({
                channelId: this.channel.channelId,
                postCount: this.timeframesData.postCount,
                startPeriodTime: '00:00',
                endPeriodTime: '23:00',
                price: this.timeframesData.postPrice * 100,
                weekDays: [1, 2, 3, 4, 5, 6, 7],
                inTopHours: 1,
                inFeedHours: this.inFeedHours
            });

            this.getChannelInfo();
        }
    }
};
</script>