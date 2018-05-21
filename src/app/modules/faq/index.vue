<template src="./index.html"></template>

<script>
// import { SupportApi } from '@services/api';
// import topics from '@utils/support-topics';

export default Vue.extend({
  data() {
    return {
      tabSelected: 0,
      questionSelected: 0,
      commonQuestions: [
        {
          question: 'lorem1?',
          answer:
            'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique commodi nihil dolores rerum, voluptates possimus assumenda dicta eaque maiores eius neque, hic numquam minima accusantium. Repudiandae aliquam amet quis officia?!'
        },
        {
          question: 'lorem2?',
          answer:
            'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique commodi nihil dolores rerum, voluptates possimus assumenda dicta eaque maiores eius neque, hic numquam minima accusantium. Repudiandae aliquam amet quis officia?!'
        }
      ]
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

.faq {
  &__question {
    padding-top: 21px;
    padding-bottom: 11px;
    border-bottom: 1px solid #e5e5e5;
    color: #2d9cdb;
    font-size: 16px;
  }

  &__answer {
    overflow: hidden;
    color: #576077;
  }

  &__answer-text {
    padding-top: 22px;
  }
}
</style>

