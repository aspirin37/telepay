<template>
  <div class="picker">
    <input class="picker__input" type="text" :id="id" :class="inputClass" :name="name" :placeholder="placeholder"
      v-model="mutableValue" data-input ref="picker" readonly="no">
    <span class="picker__icon" @click="focus">
      <i class="fa fa-calendar-minus-o" aria-hidden="true"></i>
    </span>
  </div>
</template>
<script type="text/javascript">
import Flatpickr from 'flatpickr';
import Russian from 'flatpickr/dist/l10n/ru';
export default {
  props: {
    value: {
      default: null,
      required: true,
      validate(value) {
        return value === null || value instanceof Date || typeof value === 'string' || value instanceof String || value instanceof Array
      }
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
      type: String,
    },
  },
  data() {
    return {
      mutableValue: this.value,
      fp: null,
      config: {
        dateFormat: "d.m.Y",
        locale: Russian.ru,
      }
    };
  },
  mounted() {
    if (!this.fp) {
      this.fp = new Flatpickr(this.$refs.picker, this.config);
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
