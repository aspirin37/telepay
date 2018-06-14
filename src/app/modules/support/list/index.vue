<template src="./index.html"></template>
<script>
import { SupportApi } from '@services/api';
import topics from '@utils/support-topics';
import pgn from 'vue-pagination-btns';
import Calendar from '@assets/calendar.svg';
import Status from '@assets/status.svg';

export default Vue.extend({
    data() {
        return {
            isDateReversed: false,
            ticketsList: [],
            statusList: [],
            Calendar,
            Status
        };
    },
    mixins: [pgn],
    created() {
        // this.getStatusList();
        this.getData();
    },
    watch: {
        isDateReversed() {
            this.ticketsList.reverse();
        }
    },
    methods: {
        async getData() {
            await this.getStatusList();
            await this.getTickets(this.pgnSets)
        },
        async getStatusList() {
            this.statusList = await SupportApi.getStatusList();
        },
        async getTickets(params) {
            let { items, total } = await SupportApi.getList(params);
            items.sort((a, b) => b.createdAt - a.createdAt).forEach((it, i) => {
                it.date = moment.unix(it.createdAt).format('DD.MM.YYYY');
                it.topic = topics[it.topic].name;
                it.statusName = this.statusList[it.status];
                switch (it.status) {
                    case 0:
                        it.statusClass = 'fa fa-exclamation-circle text-info';
                        break;
                    case 1:
                        it.statusClass = 'fa fa-clock-o text-warning';
                        break;
                    case 2:
                        it.statusClass = 'fa fa-check text-success';
                        break;
                }
            });

            this.ticketsList = items;
            this.pgnSets.total = total;

            if (!this.ticketsList.length) {
                this.$router.push({ name: 'support:chat' });
            }
        },
    }
});
</script>
<style lang="scss"
       scoped>
.flex-table {
    font-size: 0.9rem;
}
</style>
