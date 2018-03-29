<template lang="html">
  <div class="row">
    <div class="col-6">
      <div class="form-group">
        <p class="text-medium-font font-weight-500 mb-1">Дата</p>
        <date-input v-model="date" placeholder="Выберите дату публикации" :config="configs.date" />
      </div>
    </div>
    <div class="col-6">
      <div class="form-group">
        <p class="text-medium-font font-weight-500 mb-1">Время</p>
        <date-input v-model="time" placeholder="Выберите время публикации" :config="configs.time" />
      </div>
    </div>
    <div class="col-12">
      <div class="form-group">
        <p class="text-medium-font font-weight-500 mb-1">Текст поста</p>
        <textarea-input :value="text" @add-image="addImageHandler" @remove-image="removeImageHandler" @add-button="addButtonHandler"
          @input="updateState($event, 'text')" />
        <images-list :images="images" @remove="removeImageHandler" />
        <online-buttons :buttons="buttons" @remove-button="removeButtonHandler" />
      </div>
    </div>
    <div class="col-12 text-right">
      <button class="btn btn-primary" @click="save">Сохранить</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import dateInput from '@components/date-input';
import textareaInput from '@components/textarea-input';
import onlineButtons from '@components/online-buttons/create';
import imagesList from '@components/images-list';
import { PostsApi } from '@services/api';
export default {
  components: { dateInput, textareaInput, onlineButtons, imagesList },
  data() {
    return {
      time: '',
      date: ''
    }
  },
  computed: {
    ...mapState({
      text: state => state.post.text,
      channel: state => state.post.channel,
      images: state => state.post.images,
      buttons: state => state.post.buttons,
      configs: state => state.configs
    })
  },
  mounted() {
    this.buttonId = 0;
  },
  watch: {
    date(n) {
      let value = `${n.replace(/\./g, '-').split('-').reverse().join('-')} ${this.time}`;
      this.$store.commit('UPDATE_POST', { prop: 'publishAt', value });
    },
    time(n) {
      let value = `${this.date.replace(/\./g, '-').split('-').reverse().join('-')} ${n}`;
      this.$store.commit('UPDATE_POST', { prop: 'publishAt', value });
    }
  },
  methods: {
    updateState(e, prop) {
      this.$store.commit('UPDATE_POST', { prop, value: e });
    },
    addImageHandler(value) {
      let updated = [...this.images, value];
      this.updateState(updated, 'images');
    },
    removeImageHandler(index) {
      let filtered = this.images.filter((img, idx) => idx !== index);
      this.updateState(filtered, 'images');
    },
    addButtonHandler() {
      if (this.buttons.length >= 10) {
        return this.$notifystr.danger('Ограничение', 'Можно прикрепить не более 10 кнопок');
      }
      this.buttonId++;
      let updated = [...this.buttons, ...[{ id: this.buttonId, text: 'Default text', link: '' }]];
      this.updateState(updated, 'buttons');
    },
    removeButtonHandler(index) {
      let filtered = this.buttons.filter(item => item.id !== index);
      this.updateState(filtered, 'buttons');
    },
    save() {
      this.$emit('submit');
    }
  }
};
</script>
