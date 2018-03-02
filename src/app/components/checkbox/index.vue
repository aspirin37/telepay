<template lang="html">
  <label class="control" :style="labelStyles">
    <input type="checkbox" :style="inputStyles" v-model="checked" @change="handleChange" />
    <div class="control__indicator" :style="indicatorStyles">
      <span v-show="checked">x</span>
    </div>
    <slot></slot>
  </label>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean
    }
  },
  data() {
    return {
      checked: this.value
    }
  },
  methods: {
    handleChange(e) {
      console.log(this.checked);
      this.$emit('change', this.checked);
    }
  },
  computed: {
    labelStyles() {
      return {
        position: 'relative',
        cursor: 'pointer',
        height: '20px',
        width: '20px',
        margin: 0
      }
    },
    inputStyles() {
      return {
        display: 'none'
      }
    },
    indicatorStyles() {
      return {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px solid rgb(206, 212, 218)',
        borderRadius: '4px',
        height: '100%',
        width: '100%',
        background: '#fff'
      }
    }
  }
}
</script>
