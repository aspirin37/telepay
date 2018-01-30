<template lang="html">
  <div class="preview">
    <small class="preview__date">12 января</small>
    <p class="preview__body">
      <span class="preview__channel text-primary">Chagram</span>
      <span class="preview__message">
        this is preview text this is preview text this is preview text this is preview text this is preview text this is preview text this is preview text
        this is preview text this is preview text this is preview text this is preview text
      </span>
    </p>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
.preview {
  position: relative;
  background-color: #f5f5f5;
  padding: 30% 0px 15px 20px;
  &__channel {
    display: inline-block;
    margin-bottom: 5px;
  }
  &__body {
    position: relative;
    background-color: #fff;
    width: 60%;
    padding: 10px;
    border-radius: 5px;
    margin: 0;
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: -9px;
      z-index: 60;
      border-style: solid;
      border-width: 0px 10px 9px;
      border-color: #fff rgba(0, 0, 0, 0) #fff;
    }
  }
  &__message {
    display: block;
    margin: 0;
    background: transparent;
  }
  &__date {
    position: absolute;
    line-height: 1;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, .6);
    color: #fff;
    padding: 5px 7px;
    border-radius: 15px;
  }
}
</style>
