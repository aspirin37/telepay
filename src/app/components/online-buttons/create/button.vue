<template lang="html">
  <div class="d-flex form-group">
    <input class="form-control mr-1" type="text" v-model="data.text" placeholder="Текст кнопки">
    <input class="form-control mx-1" type="text" v-model="data.link" placeholder="Ссылка">
    <button class="btn ml-1" @click="removeButton">
      <i class="fa fa-trash"></i>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    removeButton() {
      this.$emit('remove', this.data.id);
    }
  }
}
</script>

<style lang="css">
</style>
