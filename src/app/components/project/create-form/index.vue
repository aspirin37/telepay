<template lang="html">
  <div class="row">
    <div class="col-6">
      <div class="form-group">
        <p class="text-medium-font font-weight-500 mb-1">Дата</p>
        <date-input v-model="post.date" placeholder="Выберите дату публикации" :config="configs.date" />
      </div>
    </div>
    <div class="col-6">
      <div class="form-group">
        <p class="text-medium-font font-weight-500 mb-1">Время</p>
        <date-input v-model="post.time" placeholder="Выберите время публикации" :config="configs.time" />
      </div>
    </div>
    <div class="col-12">
      <div class="form-group">
        <p class="text-medium-font font-weight-500 mb-1">Текст поста</p>
        <textarea-input v-model="post.text" @add-image="addImageHandler" @remove-image="removeImageHandler" @add-button="addButtonHandler" />
        <images-list :images="post.images" @remove="removeImageHandler" />
        <online-buttons :buttons="post.buttons" @remove-button="removeButtonHandler" />
      </div>
    </div>
    <div class="col-12 text-right">
      <button class="btn btn-primary" @click="save">Сохранить</button>
      <button class="btn btn-success" @click="publish">Запустить</button>
    </div>
  </div>
</template>

<script>
import dateInput from '@components/date-input';
import textareaInput from '@components/textarea-input';
import onlineButtons from '@components/online-buttons/create';
import imagesList from '@components/images-list';
import { ProjectApi } from '@services/api';
export default {
  components: { dateInput, textareaInput, onlineButtons, imagesList },
  data() {
    return {
      configs: {
        date: {
          dateFormat: "d.m.Y"
        },
        time: {
          enableTime: true,
          noCalendar: true,
          dateFormat: "H:i",
          time_24hr: true
        }
      },
      post: {
        channel: 'chagram',
        text: '',
        date: '',
        time: '',
        images: [],
        buttons: []
      }
    }
  },
  watch: {
    post: {
      handler(n) {
        this.$parent.$emit('update-post', this.post);
      },
      deep: true
    }
  },
  mounted() {
    this.getCurrentDate();
    this.buttonId = 0;
  },
  methods: {
    addImageHandler(value) {
      this.post.images.push(value);
    },
    removeImageHandler(index) {
      this.post.images = this.post.images.filter((img, idx) => idx !== index);
    },
    addButtonHandler() {
      if(this.post.buttons.length >= 10) {
        return this.$notifystr.danger('Ограничение', 'Можно прикрепить не более 10 кнопок');
      }
      this.buttonId++;
      this.post.buttons.push({ id: this.buttonId, text: 'Default text', link: '' });
    },
    removeButtonHandler(index) {
      this.post.buttons = this.post.buttons.filter(btn => btn.id !== index);
    },
    getCurrentDate() {
      this.post.date = Date.now();
    },
    save() {
      // ProjectApi.add({
      //   text: this.post.text,
      //   images: this.post.images,
      //   buttons: JSON.stringify(this.post.buttons.map(({ text, link }) => ({ text, link })))
      // })
      // .then(res => this.$router.push({ name: 'projects-list' }))
      // .catch(console.log);
      console.log(this.post);
    },
    publish() {
      console.log(this.post);
    }
  }
}
</script>
