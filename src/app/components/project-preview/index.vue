<template lang="html">
  <div class="preview">
    <small class="preview__date">{{ date }}</small>
    <p class="preview__body">
      <span class="preview__channel text-primary">{{ channel }}</span>
      <span class="preview__message">
        <div class="preview__images" v-if="images && images.length">
          <img v-for="(src, i) in images" class="preview__image" :class="setImgClass(i + 1)" :src="src" alt="">
        </div>
        <vue-markdown :source="message" :html="false" class="preview__text"></vue-markdown>
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
        return 'w-100 p-0';
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
  display: flex;
  background-color: rgb(245, 245, 245);
  padding: 50px 0px 15px 20px;
  background-image: url('/assets/preview-bg.jpg');
  min-height: 500px;
  align-items: flex-end;
  background-position: center;
  background-size: cover;
  &__channel {
    display: inline-block;
    margin: 5px;
  }
  &__body {
    position: relative;
    background-color: #fff;
    width: 60%;
    border-radius: 5px;
    margin: 0;
    word-wrap: break-word;
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
  &__text {
    margin: 5px;
    p {
      line-height: 1.2;
    }
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
