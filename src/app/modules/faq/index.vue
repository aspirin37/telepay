<template src="./index.html"></template>

<script>
import collapse from '@components/collapse';
import faq from '@utils/faq-questions';
import { clone } from '@utils/clone';

export default Vue.extend({
  components: {
    collapse
  },
  data() {
    return {
      tabSelected: 0,
      searchInputValue: '',
      filteredFaq: {},
      faq
    };
  },
  watch: {
    searchInputValue: function() {
      this.filteredFaq = clone(this.faq);

      if (this.searchInputValue) {
        let filterQuestions = (arr, value) => {
          return arr.filter(
            it =>
              it.answer.toLowerCase().indexOf(this.searchInputValue.toLowerCase()) > -1 ||
              it.question.toLowerCase().indexOf(this.searchInputValue.toLowerCase()) > -1
          );
        };

        this.filteredFaq.commonQuestions = filterQuestions(this.filteredFaq.commonQuestions, this.searchInputValue);
        this.filteredFaq.adsQuestions = filterQuestions(this.filteredFaq.adsQuestions, this.searchInputValue);
        this.filteredFaq.adminQuestions = filterQuestions(this.filteredFaq.adminQuestions, this.searchInputValue);

        if (this.filteredFaq.commonQuestions.length) {
          this.tabSelected = 0;
          return;
        }

        if (this.filteredFaq.adsQuestions.length) {
          this.tabSelected = 1;
          return;
        }

        if (this.filteredFaq.adminQuestions.length) {
          this.tabSelected = 2;
          return;
        }
      } else {
        this.tabSelected = 0;
        this.filteredFaq = clone(this.faq);
      }
    }
  },
  created() {
    this.filteredFaq = clone(this.faq);
  },
  methods: {}
});
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/bootstrap.scss';
.faq-container {
  padding: 0 8px;

  @include media-breakpoint-up(lg) {
    padding: 0 15px;
  }
}

.faq {
  padding-bottom: 0;

  @include media-breakpoint-up(lg) {
    padding-bottom: 40px;
  }
}

.search {
  display: block;
  position: relative;

  margin-bottom: 23px;

  @include media-breakpoint-up(lg) {
    margin-bottom: 50px;
  }

  &__icon {
    position: absolute;
    color: #dee2ee;
    top: 12px;
    left: 15px;

    @include media-breakpoint-up(lg) {
      top: 10px;
    }
  }

  &__cancel-btn {
    position: absolute;
    color: #dee2ee;
    top: 12px;
    right: 30px;

    @include media-breakpoint-up(lg) {
      top: 20px;
    }
  }

  &__input {
    padding-left: 45px;
    padding-right: 45px;
  }
}

.tabs-row {
  justify-content: space-between;
  margin-bottom: 11px;

  @include media-breakpoint-up(lg) {
    justify-content: start;
  }
}

.tabs {
  margin-bottom: 25px;
  @include media-breakpoint-up(lg) {
    margin-bottom: 50px;
  }
}

.tab {
  width: 113px;
  padding: 0.5rem 0;
  background-color: #dee2ee;
  color: #576077;
  border-radius: 3px 3px 0 0;
  font-size: 12px;
  line-height: 15px;
  text-align: center;

  @include media-breakpoint-up(lg) {
    width: 165px;
    padding: 0.75rem;
    margin-right: 13px;
    font-size: 16px;
  }

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

.faq__redirect {
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 50px;

  @include media-breakpoint-up(lg) {
    flex-direction: row;
    text-align: left;
  }
}
</style>

