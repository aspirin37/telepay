<template lang="html">
  <div class="preview">
    <small class="preview__date">{{ date }}</small>
    <div class="preview__workarea">
      <p class="preview__body">
        <span class="preview__channel text-primary">{{ channel }}</span>
        <span class="preview__message">
          <div class="preview__images" v-if="images && images.length">
            <img v-for="(src, i) in images" class="preview__image" :class="setImgClass(i + 1)" :src="src" alt="">
          </div>
          <vue-markdown :source="text" :html="false" class="preview__text"></vue-markdown>
        </span>
        <span class="preview__time">{{ time }}</span>
      </p>
      <online-buttons-list :buttons="buttons" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import VueMarkdown from 'vue-markdown';
import onlineButtonsList from '@components/online-buttons/list';
export default {
  components: { VueMarkdown, onlineButtonsList },
  computed: {
    ...mapState({
      text: state => state.post.text,
      buttons: state => state.post.buttons,
      images: state => state.post.images,
      channel: state => state.post.channel,
      time: state => state.post.time,
      date: state => state.post.date
    })
  },
  methods: {
    setImgClass(index) {
      let { length } = this.post.images;
      if(length === 1) {
        return 'w-100 p-0';
      } else if(length > 1) {
        if(length % 2 === 0) {
          return 'w-50';
        } else {
          return (index === length) ? 'w-100' : 'w-50';
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
  &__workarea {
    display: flex;
    height: 100%;
    flex-direction: column;
    width: 60%;
  }
  &__channel {
    display: inline-block;
    margin: 5px;
  }
  &__body {
    position: relative;
    background-color: #fff;
    border-radius: 5px;
    width: 100%;
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
    background: rgba(0, 0, 0, .4);
    color: #fff;
    padding: 5px 7px;
    border-radius: 15px;
  }
  &__image {
    padding: 3px;
  }
  &__buttons {
    margin-top: 5px;
  }
  &__button {
    position: relative;
    display: block;
    width: 100%;
    background-color: rgba(0,0,0,.4);
    color: rgb(255, 255, 255);
    text-align: center;
    padding: 10px;
    border-radius: 5px;
    transition: .1s ease-in-out;
    &:not(:last-child) {
      margin-bottom: 5px;
    }
    &:hover {
      background-color: rgba(0,0,0,.3);
      color: #fff;
      text-decoration: none;
    }
    .arrow {
      position: absolute;
      display: flex;
      top: 5px;
      right: 5px;
      svg {
        fill: #fff;
        height: 10px;
        width: 10px;
      }
    }
  }
  &__time {
    display: block;
    text-align: right;
    padding-bottom: 3px;
    padding-right: 10px;
    font-size: 12px;
    font-weight: 400;
    color: rgb(153, 153, 153);
  }
}
</style>
