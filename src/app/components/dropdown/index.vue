<template>
  <div class="dropp"
       ref="wrap">
    <div class="dropp__trigger"
         ref="trigger">
      <slot name="trigger"></slot>
    </div>
    <transition name="dropp">
      <dropp-menu :class="classes"
                  v-show="visible">
        <slot name="body"></slot>
      </dropp-menu>
    </transition>
  </div>
</template>
<script>
// TODO написать нормальный дропдаун вместо этого говнокода
import droppMenu from './menu.vue';
export default {
  components: { droppMenu },
  props: {
    eventTrigger: {
      type: String,
      default: 'click'
    },
    dropPosition: {
      type: String,
      default: 'center'
    }
  },
  data() {
    return {
      visible: false
    }
  },
  computed: {
    classes() {
      return [
        `dropp__body_${this.dropPosition}`
      ]
    }
  },
  mounted() {
    if (this.eventTrigger === 'click') {
      this.$refs.trigger.addEventListener('click', this.toggle);
    } else if (this.eventTrigger === 'hover') {
      this.$refs.wrap.addEventListener('mouseenter', this.show);
      this.$refs.wrap.addEventListener('mouseleave', this.hide);
    }
    window.addEventListener('click', this.clickOutside);
  },
  beforeDestroy() {
    if (this.eventTrigger === 'click') {
      this.$refs.trigger.removeEventListener('click', this.toggle);
    } else if (this.eventTrigger === 'hover') {
      this.$refs.wrap.removeEventListener('mouseenter', this.show);
      this.$refs.wrap.removeEventListener('mouseleave', this.hide);
    }
    window.removeEventListener('click', this.clickOutside);
  },
  methods: {
    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
    toggle() {
      this.visible = !this.visible;
    },
    clickOutside(e) {
      if (!this.$refs.trigger.contains(e.target)) this.hide();
    }
  }
}
</script>
<style lang="scss">
.dropp {
  position: relative;
  height: 100%;
  &__trigger {
    height: 100%;
    cursor: pointer;
  }
  &__body {
    position: absolute;
    top: 100%;
    min-width: 100%;
    z-index: 100;
    &_center {
      left: 50%;
      transform: translate(-50%, 0px);
    }
    &_left {
      left: 0;
    }
    &_right {
      right: 0;
    }
  }
}

.dropp-enter-active,
.dropp-leave-active {
  transition: .2s ease-in-out;
}

.dropp-enter,
.dropp-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px);
}
</style>