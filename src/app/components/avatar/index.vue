<template lang="html">
  <div :style="wrapStyles" ref="wrap">
    <img v-show="!error" :src="src" class="h-100 w-100" @error="handle" />
    <h1 :style="mountStyles" v-show="error" class="m-0 text-white">?</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: false,
      width: 0
    }
  },
  props: {
    src: {
      type: String
    },
    circle: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handle() {
      this.error = true;
    },
    calcWidth() {
      this.$nextTick(() => {
        this.width = this.$refs.wrap.getBoundingClientRect().width;
      });
    }
  },
  mounted() {
    this.calcWidth();
    window.addEventListener('resize', this.calcWidth);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.calcWidth);
  },
  computed: {
    wrapStyles() {
      return {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: this.width + 'px',
        backgroundColor: this.error ? 'rgb(108, 117, 125)' : 'transparent',
        borderRadius: (this.circle) ? '50%' : 0,
        overflow: 'hidden'
      }
    },
    mountStyles() {
      return {
        fontSize: (this.width * 0.55) + 'px'
      }
    }
  }
}
</script>
