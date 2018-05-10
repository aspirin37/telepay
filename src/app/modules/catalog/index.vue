<template src="./index.html"></template>

<script>
import {
    mapState
} from 'vuex';

import {
    CatalogApi,
    ChannelApi
} from '@services/api';

import avatar from '@components/avatar';
import searchInput from '@components/search-input';
import dateInput from '@components/date-input';
import channelList from '@components/channel-list';

import {
    clone,
    cloneWFn
} from '@utils/clone';

export default Vue.extend({
    components: {
        avatar,
        searchInput,
        dateInput,
        channelList
    },
    data() {
        return {
            timeFrom: '08:00',
            timeTo: '22:00',
            filter: {
                erFrom: 0,
                erTo: 1000,
                weekDay: moment().weekday() + 1,
                subscribersTo: 1000000,
                subscribersFrom: 0,
                priceTo: 100000,
                priceFrom: 0,
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
            filterConditions: '1/24',
            // weekDays: ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
            categories: [],
            channels: [],
            conditions: [{
                    name: '1/24'
                },
                {
                    name: '2/24'
                },
                {
                    name: '3/24'
                },
                {
                    name: '1/48'
                },
                {
                    name: '2/48'
                },
                {
                    name: '3/48'
                },
                {
                    name: '1/72'
                },
                {
                    name: '2/72'
                },
                {
                    name: '3/72'
                }
            ],
            showFilters: false
        };
    },
    created() {
        this.getCategories();
        this.getChannels(this.filter);
    },
    watch: {
        filterConditions(val) {
            if (!val || !val.name) {
                this.filter.inTopHours = null;
                this.filter.inFeedHours = null;
                this.getChannels(this.filter);
                return;
            }
            let arr = val.name.split('/');
            if (arr && arr.length) {
                this.filter.inTopHours = arr[0];
                this.filter.inFeedHours = arr[1];
                this.getChannels(this.filter);
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
            handler(val, newval) {
                clearTimeout(this.debounceTimeout);
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
        ...mapState(['configs']),
        selectedChannels() {
            return this.channels.filter(ch => ch.selected);
        },
        totalPrice() {
            return this.selectedChannels.reduce((sum, el) => {
                return sum + el.timeFrame.reduce((ofSum, timeFrame) => ofSum + (timeFrame.selected ? timeFrame.price : 0), 0);
            }, 0);
        }
    },
    methods: {
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
        async getCategories() {
            let {
                items,
                total
            } = await CatalogApi.list();
            this.categories = items;
        },
        async getChannels(params = {}) {
            clearTimeout(this.debounceTimeout);
            let copy = clone(params);
            copy.priceFrom *= 100;
            copy.priceTo *= 100;
            if (copy.category) {
                copy.categoryId = copy.category.categoryId;
                delete copy.category;
            }
            let {
                items,
                total
            } = await CatalogApi.filter(copy);
            let isToday = this.publishDate.day() === moment().day(),
                nowHour = moment().hour(),
                nowMinute = moment().minute();

            this.channels = items.map(item => {
                if (item.channelInfo && item.channelInfo.timeFrame) {
                    item.channelInfo.timeFrame = item.channelInfo.timeFrame.filter(timeFrame => {
                        let filterToday = true;
                        // let hour = moment(timeFrame.startPeriodTime*100).hour()
                        // if (isToday) {
                        //   filterToday = timeFrame.hour > nowHour || (timeFrame.hour === nowHour && timeFrame.minute > nowMinute);
                        // }
                        return timeFrame.weekDay === params.weekDay && filterToday;
                    });
                }
                if (item.categoryName) {
                    item.channelInfo.category = item.categoryName
                }
                return item.channelInfo;
            });
        }
    }
});
</script>