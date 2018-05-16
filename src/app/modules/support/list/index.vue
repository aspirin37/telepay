<template src="./index.html"></template>

<script>
import { SupportApi } from "@services/api";
import topics from "@utils/support-topics";
export default Vue.extend({
  data() {
    return {
      isListReversed: false,
      ticketsList: [],
      statusList: []
    };
  },
  created() {
    this.getStatusList();
    this.getTickets();
  },
  computed: {
    tickets() {
      let tickets = this.ticketsList
        .map((it, i) => {
          it.date = moment.unix(it.createdAt).format("DD.MM.YYYY  HH:mm");
          it.topic = topics[it.topic].name;
          it.statusName = this.statusList[it.status];
          switch (it.status) {
            case 0:
              it.statusClass = "fa fa-exclamation-circle text-info";
              break;
            case 1:
              it.statusClass = "fa fa-clock-o text-warning";
              break;
            case 2:
              it.statusClass = "fa fa-check text-success";
              break;
          }
          return it;
        })
        .sort((a, b) => b.createdAt - a.createdAt);

      return this.isListReversed ? tickets.reverse() : tickets;
    }
  },
  methods: {
    async getTickets() {
      let { items } = await SupportApi.getList();
      this.ticketsList = items;
    },
    async getStatusList() {
      this.statusList = await SupportApi.getStatusList();
    }
  }
});
</script>

<style lang="scss">
.flex-table {
  font-size: 0.9rem;
}
</style>

