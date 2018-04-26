<template >
  <div class="password-input__wrap">
    <input class="password-input__input" :type="type" :class="classes" :readonly="readonly" :placeholder="placeholder" @input="handler">
    <span class="password-input__eye" @click="toggle" v-if="!readonly">
      <i class="fa text-light-font" :class="eyeClass" aria-hidden="true"></i>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    classes: {
      type: String
    },
    placeholder: {
      type: String
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false
    }
  },
  computed: {
    type() {
      return this.visible ? 'text' : 'password';
    },
    eyeClass() {
      return this.visible ? 'fa-eye' : 'fa-eye-slash';
    }
  },
  methods: {
    handler(e) {
      this.$emit('input', e.target.value);
    },
    toggle() {
      this.visible = !this.visible;
    }
  }
}
</script>

<style lang="scss">
.password-input {
  &__wrap {
    position: relative;
  }
  &__input {
    padding-right: 38px;
  }
  &__eye {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 0;
    top: 0;
    height: 100%;
    width: 38px;
    cursor: pointer;
  }
}
</style>
