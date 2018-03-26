<template>
  <div class="textarea-input">
    <textarea class="form-control" rows="4" v-model="message" ref="text"></textarea>
    <div class="textarea-input__icons">
      <label class="" @click="addButton">
        <i class="fa fa-plus-circle"></i>
      </label>
      <label class="textarea-input__file-label">
        <i class="fa fa-camera text-medium-font" aria-hidden="true"></i>
        <input type="file" class="textarea-input__file-input" @change="fileUploadHandler" />
      </label>
      <dropdown :style="{ 'margin-right': '3px' }">
        <i slot="trigger" class="fa fa-smile-o text-medium-font" aria-hidden="true"></i>
        <div class="textarea-input__emoji" slot="body">
          <Picker :emoji-size="16" :i18n="i18n" @click="typeEmojiHandler" />
        </div>
      </dropdown>
    </div>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown';
import { Picker } from 'emoji-mart-vue';
import dropdown from '@components/dropdown';
import { mapState } from 'vuex';
export default {
  components: { VueMarkdown, Picker, dropdown },
  props: {
    maxImages: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      message: 'Текст...',
      i18n: {
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
    };
  },
  created() {
    this.$emit('input', this.message);
  },
  watch: {
    message(n) {
      this.$emit('input', this.message);
    }
  },
  computed: {
    ...mapState({
      imagesLength: state => state.currentPost.images.length
    }),
    maxLength() {
      return this.imagesLength ? 200 : 4096;
    }
  },
  methods: {
    typeEmojiHandler(emoji, e) {
      if (this.$refs.text.selectionStart !== this.message.length) {
        let start = this.message.substr(0, this.$refs.text.selectionStart);
        let end = this.message.substr(this.$refs.text.selectionStart);
        this.message = start + emoji.native + end;
      } else {
        this.message += emoji.native;
      }
    },
    fileUploadHandler(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      if (this.$parent.post.images.length + files.length <= this.maxImages) {
        for (let i = 0; i < files.length; i++) {
          this.createImage(files[i]);
        }
      } else {
        this.$notifystr.danger('Ограничение', `Можно прикрепить только ${this.maxImages} изображение`);
      }
    },
    createImage(file) {
      let reader = new FileReader();
      reader.addEventListener('load', e => this.$emit('add-image', e.target.result));
      reader.readAsDataURL(file);
    },
    addButton() {
      this.$emit('add-button');
    }
  }
};
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
  &__file-input {
    display: none;
  }
  .fa {
    cursor: pointer;
  }
}
</style>
