<template src="./index.html"></template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex';

import { CatalogApi, ChannelApi } from '@services/api';

import avatar from '@components/avatar';
import dateInput from '@components/date-input';
import channelList from '@components/channel-list';
import searchInputOk from '@components/search-input-ok';
import vSelect from 'vue-select';

import CancelBtn from '@assets/crest-01.svg';

import { clone, cloneWFn } from '@utils/clone';

export default Vue.extend({
    components: {
        avatar,
        dateInput,
        channelList,
        searchInputOk,
        vSelect
    },
    data() {
        return {
            CancelBtn,
            isSearching: false,
            timeFrom: '08:00',
            timeTo: '22:00',
            totalChannels: null,
            filter: {
                nameSort: null,
                inTopUntilSort: null,
                subscribersSort: null,
                priceSort: null,
                erSort: null,
                subscribersFrom: 0,
                subscribersTo: 10000,
                erFrom: 0,
                erTo: 100,
                priceFrom: 0,
                priceTo: 10000,
                weekDay: moment().weekday() + 1,
                category: null,
                text: '',
                inTopHours: null,
                inFeedHours: null,
                timeFrom: moment()
                    .utc(4)
                    .set('hour', 8)
                    .set('minute', 0)
                    .set('second', 0),
                timeTo: moment()
                    .utc(4)
                    .set('hour', 22)
                    .set('minute', 0)
                    .set('second', 0)
            },
            publishDate: moment(),
            filterConditions: null,
            // weekDays: ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
            categories: [],
            channels: [],
            conditions: [{ name: '1/24' }, { name: '1/48' }, { name: '1/∞' }],
            showFilters: false,
            page: 1,
            limit: 10,
            loading: false,
            sorting: {

            }
        };
    },
    created() {
        this.getData();
    },
    mounted() {
        this.$on('isSearching', data => {
            this.isSearching = data;
        });
        this.$on('scrolledBottom', () => {
            if (this.channels.length >= this.limit) {
                let offset = this.page * this.limit
                this.getChannels(this.filter, true, offset)
                this.page++
            }
        });
        this.$on('sorted', (sortingName, sortingType) => {
            this.filter.nameSort = null
            this.filter.inTopUntilSort = null
            this.filter.subscribersSort = null
            this.filter.priceSort = null
            this.filter.erSort = null
            this.filter[sortingName] = sortingType
        });
    },
    watch: {
        filterConditions(val) {
            if (!val || !val.name) {
                this.filter.inTopHours = null;
                this.filter.inFeedHours = null;
                // this.getChannels(this.filter);
                return;
            }
            let arr = val.name.split('/');
            if (arr && arr.length) {
                this.filter.inTopHours = arr[0];
                this.filter.inFeedHours = arr[1] === '∞' ? 0 : arr[1];
                // this.getChannels(this.filter);
            }
        },
        timeFrom(val) {
            this.compileDate(val, 'timeFrom');
        },
        timeTo(val) {
            this.compileDate(val, 'timeTo');
        },
        'filter.weekDay': function() {
            this.compileDate(this.timeFrom, 'timeFrom');
            this.compileDate(this.timeTo, 'timeTo');
        },
        filter: {
            handler(val) {
                clearTimeout(this.debounceTimeout);
                this.page = 1
                let container = document.querySelector('.body')
                if (container) container.scrollTop = 0
                this.debounceTimeout = setTimeout(this.getChannels, 500, val);
            },
            deep: true
        },
        publishDate(val) {
            if (!(val instanceof moment)) {
                val = moment(val);
                return;
            }
            this.filter.weekDay = val.weekday() + 1;
        }
    },
    computed: {
        ...mapState(['configs', 'user', 'selectedChannels']),
        ...mapGetters({
            isAuthorized: 'isAuthorized',
        }),
        totalPrice() {
            return this.selectedChannels.reduce((sum, el) => {
                return sum + el.timeFrame.reduce((ofSum, tf) => ofSum + (tf.selected ? tf.priceWithCommission : 0), 0);
            }, 0);
        },
        isMobile() {
            return this.$mq === 'sm';
        },
        isDesktop() {
            return this.$mq !== 'sm';
        }
    },
    methods: {
        ...mapActions({
            dropSelectedChannels: 'DROP_SELECTED_CHANNELS'
        }),
        // setFilter() {

        // },
        async getData() {
            await Promise.all([
                this.getCategories(),
                this.getFilterValues()
            ]);
            await this.getChannels(this.filter);
        },
        async getCategories() {
            // this.$store.commit('TOGGLE_LOADING', true);
            let { items, total } = await CatalogApi.list();
            this.categories = items.sort((a, b) => b.count - a.count).map(it => {
                if (it.count !== null) it.name += ` (${it.count})`;
                return it
            });
        },
        async getFilterValues() {
            // this.$store.commit('TOGGLE_LOADING', true);
            let stats = await CatalogApi.getStats();
            this.filter.subscribersFrom = stats.subscriberCountMin;
            this.filter.subscribersTo = stats.subscriberCountMax;
            this.filter.erFrom = stats.engagementRateMin;
            this.filter.erTo = stats.engagementRateMax;
            this.filter.priceFrom = stats.priceWithCommissionMin / 100;
            this.filter.priceTo = stats.priceWithCommissionMax / 100;
        },
        async getChannels(params = {}, isScrolled = false, offset) {
            this.loading = true;
            // this.$store.commit('TOGGLE_LOADING', true);
            clearTimeout(this.debounceTimeout);
            let copy = clone(params);
            if (!copy.limit) copy.limit = this.limit;
            if (!copy.offset) copy.offset = offset;
            copy.priceFrom *= 100;
            copy.priceTo *= 100;
            if (copy.category) {
                copy.categoryId = copy.category.categoryId;
                delete copy.category;
            }

            let { items, total } = await CatalogApi.filter(copy)
            this.totalChannels = total;
            let isToday = this.publishDate.day() === moment().day(),
                nowHour = moment().hour(),
                nowMinute = moment().minute();

            let temp = items.map(item => {
                item.cheapestTimeFrame = ChannelApi.getCheapestTimeFrame(item);

                if (item.categoryItem && item.categoryItem[0]) item.category = item.categoryItem[0].category.name;
                return item;
            });

            this.channels = isScrolled ? this.channels.concat(temp) : temp;

            // console.log(items.length)

            if (!items.length) {
                this.noMoreItems = true
            }

            // this.channels = this.channels.concat(this.channels)

            if (this.selectedChannels) {
                this.selectedChannels.forEach(sch => {
                    this.channels = this.channels.map(ch => {
                        if (ch.channelId === sch.channelId) {
                            ch.timeFrame.forEach(tf => {
                                tf.selected = true;
                            });
                            ch.selected = true;
                        }
                        return ch;
                    });
                });
            }

            this.loading = false;
            // this.$store.commit('TOGGLE_LOADING', false);
        },
        compileDate(val, key) {
            if (val) {
                let [hour, minute] = val.split(':');
                this.filter[key] = moment(this.publishDate)
                    .utc(4)
                    .set('hour', hour)
                    .set('minute', minute);
            }
        },
        toggleFilters() {
            this.showFilters = !this.showFilters;
        },
        dropSelected() {
            this.channels = this.channels.map(ch => {
                ch.timeFrame.forEach(tf => {
                    tf.selected = false;
                });
                ch.selected = false;
                return ch;
            });
            this.dropSelectedChannels();
        }
    }
});
</script>