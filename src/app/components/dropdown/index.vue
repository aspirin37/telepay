<template lang="html">
  <div class="dropp" @click="toggle" ref="wrap">
    <div class="dropp__trigger">
      <slot name="trigger"></slot>
    </div>
    <transition name="dropp">
      <div class="dropp__body" v-show="visible">
        <slot name="body"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    }
  },
  mounted() {
    window.addEventListener('click', this.clickOutside);
  },
  beforeDestroy() {
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
      if(!this.$refs.wrap.contains(e.target)) this.hide();
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
    right: 0;
    top: 100%;
    width: 100%;
    z-index: 100;
  }
}

.dropp-enter-active, .dropp-leave-active {
  transition: .2s;
}
.dropp-enter, .dropp-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
