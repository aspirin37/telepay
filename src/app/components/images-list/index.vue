<template lang="html">
  <div v-if="images.length" class="file-previews">
    <div v-for="(src, i) in images" class="file-previews__item" :style="{ 'background-image': 'url(' + src.decoded + ')' }">
      <span class="file-previews__remove" @click="removeImage(i)">
        <i class="fa fa-times" aria-hidden="true"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      default: () => ([])
    }
  },
  methods: {
    removeImage(i) {
      this.$emit('remove', i);
    }
  }
}
</script>
<style lang="scss">
.file-previews {
  display: flex;
  left: 0;
  top: 100%;
  padding-top: 10px;
  .file-previews__item {
    position: relative;
    width: 50px;
    height: 50px;
    margin-right: 3px;
    background-position: center;
    background-size: cover;
    .file-previews__remove {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 12px;
      line-height: 1;
      padding: 0 2px;
      cursor: pointer;
      z-index: 100;
      background: rgba(255, 255, 255, 0.9);
      color: rgb(0, 0, 0);
    }
  }
}
</style>
