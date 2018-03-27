<template lang="html">
  <div class="row">
    <div class="col-6">
      <div class="form-group">
        <p class="text-medium-font font-weight-500 mb-1">Дата</p>
        <date-input :value="date" placeholder="Выберите дату публикации" :config="configs.date" @input="updateState($event, 'date')" />
      </div>
    </div>
    <div class="col-6">
      <div class="form-group">
        <p class="text-medium-font font-weight-500 mb-1">Время</p>
        <date-input :value="time" placeholder="Выберите время публикации" :config="configs.time" @input="updateState($event, 'time')" />
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
      configs: {
        date: {
          dateFormat: 'd.m.Y'
        },
        time: {
          enableTime: true,
          noCalendar: true,
          dateFormat: 'H:i',
          time_24hr: true
        }
      }
    };
  },
  computed: {
    ...mapState({
      text: state => state.post.text,
      channel: state => state.post.channel,
      images: state => state.post.images,
      buttons: state => state.post.buttons,
      date: state => state.post.date,
      time: state => state.post.time
    })
  },
  mounted() {
    this.buttonId = 0;
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
