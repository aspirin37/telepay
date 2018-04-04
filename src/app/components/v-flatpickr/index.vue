<template>
  <input type="text"
    :id="id"
    :class="inputClass"
    :name="name"
    :placeholder="placeholder"
    :required="required"
    v-model="mutableValue"
    data-input>
</template>
<script type="text/javascript">
import Flatpickr from 'flatpickr';

export default {
  props: {
    value: {
      default: null,
      required: true,
      validate(value) {
        return value === null || value instanceof Date || typeof value === 'string' || value instanceof String || value instanceof Array;
      }
    },
    config: {
      type: Object,
      default: () => ({
        wrap: false
      })
    },
    placeholder: {
      type: String,
      default: ''
    },
    inputClass: {
      type: [String, Object],
      default: 'form-control input'
    },
    name: {
      type: String,
      default: 'date-time'
    },
    required: {
      type: Boolean,
      default: false
    },
    id: {
      type: String
    }
  },
  data() {
    return {
      mutableValue: this.value,
      fp: null
    };
  },
  mounted() {
    if (!this.fp) {
      let elem = this.config.wrap ? this.$el.parentNode : this.$el;
      this.fp = new Flatpickr(elem, this.config);
    }
    this.$root.$on('v-flatpickr::remount', this.remount);
  },
  beforeDestroy() {
    if (this.fp && this.fp.destroy) {
      this.fp.destroy();
      this.fp = null;
    }
    this.$root.$off('v-flatpickr::remount', this.remount);
  },
  watch: {
    config(newConfig) {
      this.fp.config = Object.assign(this.fp.config, newConfig);
      this.fp.redraw();
      this.fp.setDate(this.value, true);
    },

    mutableValue(newValue) {
      this.$emit('input', newValue);
    },

    value(newValue) {
      this.fp && this.fp.setDate(newValue, true);
    }
  },
  methods: {
    remount() {
      if (this.fp && this.fp.destroy) {
        this.fp.destroy();
        this.fp = null;
      }

      if (!this.fp) {
        let elem = this.config.wrap ? this.$el.parentNode : this.$el;
        this.fp = new Flatpickr(elem, this.config);
      }
    }
  }
};
</script>
