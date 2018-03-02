<template lang="html">
  <div class="drophover" @mouseover="show" @mouseleave="hide">
    <div class="drophover__trigger">
      <slot name="trigger"></slot>
    </div>
    <transition name="drophover">
      <div class="drophover__body" v-show="visible">
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
  methods: {
    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    }
  }
}
</script>

<style lang="scss">
.drophover {
  position: relative;
  height: 100%;
  &__trigger {
    height: 100%;
    cursor: pointer;
  }
  &__body {
    position: absolute;
    right: calc(-150px + 30px);
    top: 100%;
    width: 300px;
    z-index: 100;
  }
}

.drophover-enter-active, .drophover-leave-active {
  transition: .2s;
}
.drophover-enter, .drophover-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
