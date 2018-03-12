<template>
  <div class="textarea-input">
    <textarea class="form-control" rows="4" v-model="message" ref="text"></textarea>
    <div class="textarea-input__icons">
      <label class="textarea-input__file-label">
        <i class="fa fa-camera text-medium-font" aria-hidden="true"></i>
        <input type="file" class="textarea-input__file-input" @change="fileUploadHandler" multiple />
      </label>
      <dropdown :style="{ 'margin-right': '5px' }">
        <i slot="trigger" class="fa fa-smile-o text-medium-font" aria-hidden="true"></i>
        <div class="textarea-input__emoji" slot="body">
          <Picker :emoji-size="16" :i18n="i18n" @click="typeEmojiHandler" />
        </div>
      </dropdown>
    </div>
    <div v-if="images" class="textarea-input__file-previews">
      <div v-for="(src, i) in images" class="textarea-input__preview" :style="{ 'background-image': 'url(' + src + ')' }">
        <span class="remove" @click="removeFileHandler(i)">
          <i class="fa fa-times" aria-hidden="true"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown';
import { Picker } from 'emoji-mart-vue';
import dropdown from '@components/dropdown';
export default {
  components: { VueMarkdown, Picker, dropdown },
  data() {
    return {
      message: 'Текст...',
      images: [],
      'i18n': {
        categories: {
          search: 'Результаты поиска',
          recent: 'Часто используемые',
          people: 'Смайлы и люди',
          nature: 'Животные и природа',
          foods: 'Еда',
          activity: 'Мероприятия',
          places: 'Путешествия',
          objects: 'Предметы',
          symbols: 'Символы',
          flags: 'Флаги'
        }
      }
    }
  },
  created() {
    this.$emit('input', this.message);
  },
  watch: {
    message(n) {
      this.$emit('input', this.message);
    }
  },
  methods: {
    typeEmojiHandler(emoji, e) {
      if(this.$refs.text.selectionStart !== this.message.length) {
        let start = this.message.substr(0, this.$refs.text.selectionStart);
        let end = this.message.substr(this.$refs.text.selectionStart);
        this.message = (start + emoji.native + end);
      } else {
        this.message += emoji.native;
      }
    },
    fileUploadHandler(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      for(let i = 0; i < files.length; i++) {
        if(this.images.length < 6) {
          this.createImage(files[i]);
        }
      }
    },
    createImage(file) {
      let reader = new FileReader();
      reader.addEventListener('load', e => {
        this.images.push(e.target.result);
        this.$emit('upload-image', e.target.result)
      })
      reader.readAsDataURL(file);
    },
    removeFileHandler(index) {
      this.images = this.images.filter((img, i) => i !== index);
      this.$emit('remove-image', index);
    }
  }
}
</script>

<style lang="scss">
.emoji-mart-search,
.emoji-mart-bar {
  display: none;
}
.textarea-input {
  position: relative;
  label {
    margin-bottom: 0;
  }
  &__icons {
    display: flex;
    position: absolute;
    bottom: 0;
    right: 0;
    &:last-child {
      margin-right: 2px;
    }
    i {
      padding: 5px;
    }
  }
  &__emoji {
    position: absolute;
    bottom: 100%;
    right: 0;
  }
  // &__file-label {
  //   height: 20px;
  //   width: 20px;
  // }
  &__file-input {
    display: none;
  }
  &__file-previews {
    position: absolute;
    display: flex;
    left: 0;
    top: 100%;
    padding-top: 10px;
  }
  &__preview {
    position: relative;
    width: 50px;
    height: 50px;
    margin: 0 3px;
    background-position: center;
    background-size: cover;
    .remove {
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
  .fa {
    cursor: pointer;
  }
}
</style>
