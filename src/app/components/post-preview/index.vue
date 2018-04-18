<template lang="html">
  <div class="preview">
    <small class="preview__date">{{ formattedDate }}</small>
    <div class="preview__workarea">
      <p class="preview__body">
        <span class="preview__channel text-primary">{{ post.channel }}</span>
        <span class="preview__message">
          <div class="preview__images" v-if="post && post.images && post.images.length">
            <img v-for="(src, i) in post.images" class="preview__image" :src="getImageSrc(src)" alt="Image">
          </div>
           <div class="preview__text" v-html="replaceMarkdown(post.text)"></div>
        </span>
        <span class="preview__time">{{ post.time }}</span>
      </p>
      <div class="preview__buttons" v-if="post && post.buttons && post.buttons.length">
    <a target="_blank" rel="nofollow noreferrer noopener" v-for="btn in post.buttons" class="preview__button" :href="`//${btn.link}`" v-show="btn.text">
      <span class="link-arrow">
        <svg viewBox="0 0 283.178 283.178">
        	<g>
        		<path d="M254.812,140.713h-20c-4.142,0-7.5,3.358-7.5,7.5v91.186c0,4.84-3.939,8.778-8.779,8.778H43.776
        			c-4.839,0-8.775-3.938-8.775-8.778V64.645c0-4.841,3.936-8.78,8.775-8.78h95.855c4.142,0,7.5-3.358,7.5-7.5v-20
        			c0-4.142-3.358-7.5-7.5-7.5H43.776c-24.138,0-43.775,19.64-43.775,43.78v174.755c0,24.14,19.638,43.778,43.775,43.778h174.756
        			c24.14,0,43.779-19.639,43.779-43.778v-91.186C262.312,144.071,258.954,140.713,254.812,140.713z"/>
        		<path d="M275.677,0h-79.553c-4.142,0-7.5,3.358-7.5,7.5v20c0,4.142,3.358,7.5,7.5,7.5h27.304
        			L120.683,137.743c-2.929,2.929-2.929,7.677,0,10.607l14.142,14.143c1.407,1.407,3.314,2.197,5.304,2.197
        			c1.989,0,3.897-0.79,5.303-2.197L248.177,59.748v27.303c0,4.142,3.358,7.5,7.5,7.5h20c4.142,0,7.5-3.358,7.5-7.5V7.5
        			C283.177,3.358,279.819,0,275.677,0z"/>
        	</g>
        </svg>
      </span>
      {{ btn.text }}
    </a>
  </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    formattedDate() {
      let date = this.post.publishAt;
      if (/\./.test(date)) {
        date = date
          .split('.')
          .reverse()
          .join('-');
      }
      let ftd = moment(date).format('MMMM DD');
      return ftd[0].toUpperCase() + ftd.slice(1);
    }
  },
  methods: {
    getImageSrc(src) {
      if (typeof src === 'string') return src;
      return src && src.decoded;
    },
    replaceMarkdown(text) {
      text = this.replaceBold(text);
      text = this.replaceItalic(text);
      text = this.replacePre(text);
      text = this.replaceCode(text);
      text = this.replaceHashtags(text);
      text = this.replaceMentions(text);
      text = this.replaceLineBreaks(text);
      text = this.replaceLinks(text);

      return text;
    },
    replaceBold(text) {
      return this._replace(text, /\*\n?(.+?)\n?\*/g, el => `<b>${el.slice(1, el.length - 1)}</b>`);
    },
    replaceItalic(text) {
      return this._replace(text, /\_\n?(.+?)\n?\_/g, el => `<i>${el.slice(1, el.length - 1)}</i>`);
    },
    replacePre(text) {
      return this._replace(text, /\`\`\`\n?(.+?)\n?\`\`\`/g, el => `<pre>${el.slice(3, el.length - 3)}</pre>`);
    },
    replaceCode(text) {
      return this._replace(text, /\`\n?(.+?)\n?\`/g, el => `<code>${el.slice(1, el.length - 1)}</code>`);
    },
    replaceLineBreaks(text) {
      return this._replace(text, /\n/g, () => '<br>');
    },
    replaceHashtags(text) {
      return this._replace(text, /\n?#(.+?)\b\n?/g, el => `<span class="preview__link">${el}</span>`);
    },
    replaceMentions(text) {
      return this._replace(text, /\n?@(.+?)\b\n?/g, el => `<span class="preview__link">${el}</span>`);
    },
    replaceLinks(text) {
      let link = text.match(/\[(.+?)\)/g);
      if (link) {
        link.forEach((linkel, i) => {
          let arr = linkel.replace(/\s/g, '').split('](');
          if (arr[1] && /^https?:\/\//.test(arr[1])) {
            text = text.replace(linkel, `<a class="preview__link" href="${arr[1].slice(0, arr[1].length - 1)}">${arr[0].slice(1)}</a>`);
          }
        });
      }
      return text;
    },
    _replace(text, match, replacer) {
      let matched = text.match(match);
      if (matched) {
        matched.forEach(el => {
          text = text.replace(el, replacer(el));
        });
      }
      return text;
    }
  }
};
</script>

<style lang="scss">
.w-50 {
  width: 50% !important;
}
.preview {
  position: relative;
  display: flex;
  padding: 50px 0px 15px 20px;
  background-color: rgb(245, 245, 245);
  background-image: url('/assets/preview-bg.jpg');
  background-position: center;
  background-size: contain;
  min-height: 300px;
  align-items: flex-end;
  border-radius: 10px;
  font-family: 'Open Sans', sans-serif !important;

  &__workarea {
    display: flex;
    height: 100%;
    flex-direction: column;
    width: 80%;
  }
  &__channel {
    display: inline-block;
    font-weight: 600;
    color: #1895d3 !important;
  }
  &__body {
    position: relative;
    background-color: #fff;
    border-radius: 5px;
    width: 100%;
    margin: 0;
    padding: 6px 10px;
    word-wrap: break-word;
    box-shadow: 0px 1.5px 0px rgba(0, 0, 0, 0.1);
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: -9px;
      z-index: 60;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 0 10px 15px;
      box-shadow: 0px 1.5px 0px rgba(0, 0, 0, 0.1);
      border-color: transparent transparent #ffffff transparent;
    }
    pre,
    code {
      display: inline;
      color: #4e7491;
      margin: 0;
      padding: 0;
    }
  }
  &__message {
    display: block;
    margin: 0;
    background: transparent;
  }
  &__link {
    color: #1895d3;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  &__text {
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
    background: rgba(0, 0, 0, 0.4);
    color: #fff;
    padding: 5px 7px;
    border-radius: 15px;
  }
  &__images {
    margin: 5px -10px;
  }
  &__image {
    width: 100%;
  }
  &__buttons {
    margin-top: 5px;
  }
  &__button {
    position: relative;
    display: block;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    color: rgb(255, 255, 255);
    text-align: center;
    padding: 10px;
    border-radius: 5px;
    transition: 0.1s ease-in-out;
    &:not(:last-child) {
      margin-bottom: 5px;
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.3);
      color: #fff;
      text-decoration: none;
    }
    .link-arrow {
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
    font-size: 12px;
    font-weight: 400;
    color: rgb(153, 153, 153);
  }
}
</style>
