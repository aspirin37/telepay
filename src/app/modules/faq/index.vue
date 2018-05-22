<template src="./index.html"></template>

<script>
import collapse from '@components/collapse';
import faq from '@utils/faq-questions';

export default Vue.extend({
  components: {
    collapse
  },
  data() {
    return {
      tabSelected: 0,
      faq
    };
  },
  created() {},
  watch: {},
  methods: {}
});
</script>

<style lang="scss" scoped>
.search {
  position: relative;
  margin-bottom: 50px;

  &__icon {
    position: absolute;
    color: #dee2ee;
    top: 10px;
    left: 15px;
  }

  &__cancel-btn {
    position: absolute;
    color: #dee2ee;
    top: 15px;
    right: 30px;
  }

  &__input {
    padding-left: 45px;
    padding-right: 45px;
  }
}

.tabs-row {
  margin-bottom: 11px;
}

.tab {
  width: 165px;
  margin-right: 13px;
  background-color: #dee2ee;
  color: #576077;
  border-radius: 3px 3px 0 0;
  font-size: 16px;

  &--active {
    background-color: #576076;
    color: #f2f2f2;
  }
}

.collapse-item {
  &__header {
    padding-top: 21px;
    padding-bottom: 11px;
    border-bottom: 1px solid #e5e5e5;
    color: #2d9cdb;
    font-size: 16px;
  }

  &__wrapper {
    overflow: hidden;
    color: #576077;
  }

  &__text {
    padding-top: 22px;
  }
}
</style>

