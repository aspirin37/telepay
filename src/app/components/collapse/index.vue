<template>
    <div class="collapse-item">
        <div class="collapse-item__header pointer" @click="itemSelected == false ? itemSelected = true : itemSelected = false">
            <span class="collapse--item__header-text mr-1">{{ collapseHeader }}</span>
            <span :class="[itemSelected ? 'fa-angle-down' : 'fa-angle-right', 'fa fa-lg']"></span>
        </div>
        <transition name="collapse">
            <div class="collapse-item__wrapper" v-show="itemSelected">
                <pre class="collapse-item__content" v-if="collapseContent">{{collapseContent}}</pre>
                <slot v-else></slot>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
  data() {
    return {
      itemSelected: false
    };
  },
  props: ['collapseHeader', 'collapseContent'],
  methods: {}
};
</script>
<style lang="scss"
       scoped>
@import '~bootstrap/scss/bootstrap.scss';

.collapse-item {
  border-bottom: 1px solid #e5e5e5;
  &__header {
    padding: 10px 0;
    color: #2d9cdb;
    font-size: 16px;
  }

  &__header-text {
    font-weight: 600;
    font-size: 15px;

    @include media-breakpoint-up(md) {
      font-size: 16px;
    }
  }

  &__wrapper {
    overflow: hidden;
    color: #576077;
  }

  &__content {
    padding: 22px 0;
    line-height: 20px;
  }
}

.collapse-enter-active,
.collapse-leave-active {
  transition: max-height 0.5s ease-in-out;
  max-height: 200px;
}

.collapse-enter,
.collapse-leave-to {
  max-height: 0;
}

pre {
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol';
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  color: #576077;
  text-align: left;
  white-space: pre-line;
}
</style>