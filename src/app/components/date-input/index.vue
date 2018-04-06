<template>
  <div class="picker">
    <input class="picker__input" type="text" :class="inputClass" :placeholder="placeholder" v-model="mutableValue" ref="picker">
    <span class="picker__icon" @click="focus">
      <i class="fa fa-calendar-o text-medium-font" aria-hidden="true"></i>
    </span>
  </div>
</template>
<script type="text/javascript">
import Flatpickr from 'flatpickr';
import Russian from 'flatpickr/dist/l10n/ru';
export default {
  props: {
    config: {
      type: Object
    },
    value: {
      default: null,
      required: true
    },
    placeholder: {
      type: String,
      default: ''
    },
    inputClass: {
      type: [String, Object],
      default: 'form-control input'
    },
    format: {
      type: String,
      default: 'MMMM DD'
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      mutableValue: this.value,
      fp: null,
      conf: {
        ...this.config,
        locale: Russian.ru
      }
    };
  },
  mounted() {
    if (!this.fp) {
      this.fp = new Flatpickr(this.$refs.picker, this.conf);
    }
  },
  beforeDestroy() {
    if (this.fp) {
      this.fp.destroy();
      this.fp = null;
    }
  },
  watch: {
    mutableValue(newValue) {
      this.$emit('input', newValue);
    },
    value(newValue) {
      this.fp && this.fp.setDate(newValue, true);
    }
  },
  methods: {
    focus() {
      this.$refs.picker.focus();
    }
  }
};
</script>

<style lang="scss">
.picker {
  position: relative;
  &__icon {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 38px;
    cursor: pointer;
  }
}
</style>
