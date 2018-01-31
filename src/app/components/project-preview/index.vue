<template lang="html">
  <div class="preview">
    <small class="preview__date">{{ date }}</small>
    <p class="preview__body">
      <span class="preview__channel text-primary">{{ channel }}</span>
      <span class="preview__message">
        <vue-markdown :source="message" :html="false"></vue-markdown>
        <div class="preview__images" v-if="images && images.length">
          <img v-for="(src, i) in images" class="preview__image" :class="setImgClass(i + 1)" :src="src" alt="">
        </div>
      </span>
    </p>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown';
export default {
  components: { VueMarkdown },
  props: {
    date: {
      type: String
    },
    message: {
      type: String
    },
    channel: {
      type: String
    },
    images: {
      type: Array
    }
  },
  methods: {
    setImgClass(index) {
      if(this.images.length === 1) {
        return 'w-100';
      } else if(this.images.length > 1) {
        if(this.images.length % 2 === 0) {
          return 'w-50';
        } else {
          return (index === this.images.length) ? 'w-100' : 'w-50';
        }
      }
    }
  }
}
</script>

<style lang="scss">
.w-50 {
  width: 50%!important;
}
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
  &__image {
    padding: 3px;
  }
}
</style>
