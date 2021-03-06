<template src="./index.html">
</template>
<script>
import { ChannelApi } from '@services/api';
import avatar from '@components/avatar';
import normCheckbox from '@components/checkbox';
import loader from '@components/loader';
import channelAvatar from '@components/channel-avatar'


import { clone } from '@utils/clone';
export default Vue.extend({
    components: {
        avatar,
        channelAvatar,
        normCheckbox,
        loader
    },
    props: {
        channels: {
            type: Array,
            default () {
                return [];
            }
        },
        notAvailableTimeFrames: {
            type: Array,
            default () {
                return [];
            }
        },
        filter: {
            type: Object,
            default () {
                return {};
            }
        },
        user: {
            type: Object,
            default () {
                return {};
            }
        },
        placeholder: {
            type: String,
            default: 'Нет подходящих предложений'
        },
        smallBody: {
            type: Boolean,
            default: false
        },
        isChips: {
            type: Boolean,
            default: false
        },
        noMoreItems: {
            type: Boolean,
            default: false
        },
        limit: {
            type: Number,
            default: 10,
        },
        loading: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            state: null,
            sorting: {
                nameSort: 'ASC',
                inTopUntilSort: 'ASC',
                subscribersSort: 'ASC',
                priceSort: 'ASC',
                erSort: 'ASC'
            },
            sortingSelected: 'nameSort'
        }
    },
    computed: {
        isMobile() {
            return this.$mq == 'sm'
        },
        isDesktop() {
            return this.$mq != 'sm'
        },
        selectedChannels() {
            return this.innerChannels.reduce((sum, ch) => {
                let selectedTimeFrames = ch.timeFrame.some(timeFrame => timeFrame.selected);
                if (selectedTimeFrames) {
                    ch.selected = true;
                    sum.push(ch);
                } else {
                    ch.selected = false;
                }
                return sum;
            }, []);
        },
        innerChannels() {
            return this.channels.reduce((sum, ch) => {
                if (ch.showAllTimeFrames === undefined) Vue.set(ch, 'showAllTimeFrames', false);
                if (ch.selected === undefined) Vue.set(ch, 'selected', false);
                if (ch.timeFrame && ch.timeFrame.length) {
                    ch.cheapestTimeFrame = ChannelApi.getCheapestTimeFrame(ch);
                    ch.timeFrame.forEach(timeFrame => {
                        if (timeFrame.selected === undefined) Vue.set(timeFrame, 'selected', false);
                        this.notAvailableTimeFrames.forEach(it => {
                            ch.disabled = it == timeFrame.timeFrameId ? true : false;
                        });
                        if (!this.notAvailableTimeFrames.length) ch.disabled = false;
                    });
                    sum.push(ch);
                }
                return sum;
            }, []);
        }
    },
    watch: {
        noMoreItems() {
            if (this.noMoreItems && this.state) {
                this.state.complete()
            }
        },
    },
    methods: {
        nextPage() {
            this.$parent.$emit('scrolledBottom')
        },
        changeSorting(sortName) {
            if (this.sortingSelected == sortName) {
                this.sorting[sortName] = this.sorting[sortName] == 'ASC' ? 'DESC' : 'ASC'
            } else {
                this.sorting[this.sortingSelected] = 'ASC'
                this.sortingSelected = sortName
                this.sorting[sortName] = this.sorting[sortName] == 'ASC' ? 'DESC' : 'ASC'
            }

            this.$parent.$emit('sorted', this.sortingSelected, this.sorting[this.sortingSelected])
        },
        chipsClickHandler(evt, username) {
            let cancelBtn = '.close-icon';
            if (!evt.target.matches(cancelBtn)) {
                this.$router.push({ name: 'channels:show', params: { username } })
            }
        },
        timeFrameDates: ChannelApi.timeFrameDates,
        toggleChannel(ch, changeModel) {
            if (changeModel) ch.selected = !ch.selected;
            if (!ch.selected) {
                ch.timeFrame.forEach(timeFrame => {
                    timeFrame.selected = false;
                });
            } else {
                ch.cheapestTimeFrame.selected = true;
            }
            if (this.$store) this.$store.dispatch('SAVE_SELECTED_CHANNELS', this.innerChannels.filter(ch => ch.selected));
        },
        toggleTimeFrame(ch, timeFrame) {
            if (timeFrame.selected) {
                ch.selected = true;
            } else if (!ch.timeFrame.some(tf => tf.selected)) {
                ch.selected = false;
            }
        }
    }
});
</script>