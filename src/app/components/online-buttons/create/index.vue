<template lang="html">
  <div class="online-buttons-create">
    <online-button v-for="button in buttons" :key="button.id" :data="button" @remove="removeButton" />
  </div>
</template>

<script>
import onlineButton from './button.vue';
export default {
  components: { onlineButton },
  props: {
    buttons: {
      type: Array,
      default: () => ([])
    }
  },
  methods: {
    removeButton(e) {
      this.$emit('remove-button', e);
    }
  }
}
</script>

<style lang="scss">
.online-buttons-create {
  padding-top: 10px;
}
</style>
