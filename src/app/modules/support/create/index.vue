<template src="./index.html"></template>
<script>
import { SupportApi } from "@services/api";
import searchInput from "@components/search-input";
export default Vue.extend({
  components: {
    searchInput
  },
  data() {
    return {
      topics: [{
          id: 1,
          name: "Проблема",
      }, {
          id: 2,
          name: "Вопрос",
      }, {
          id: 3,
          name: "Предложение",
      }],
      selectedTopic: ""
    };
  },
  created() {},
  methods: {}
});
</script>
