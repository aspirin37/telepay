<template src="./index.html"></template>
<script>
import { SupportApi } from "@services/api";
import searchInput from "@components/search-input";
import supportTextarea from "@components/support-textarea";

export default Vue.extend({
  components: {
    searchInput,
    supportTextarea
  },
  watch: {
    selectedTopic() {
      this.validateMessage();
    },
    newMessage() {
      this.validateMessage();
    }
  },
  data() {
    return {
      topics: [
        {
          id: 1,
          name: "Проблема"
        },
        {
          id: 2,
          name: "Вопрос"
        },
        {
          id: 3,
          name: "Предложение"
        }
      ],
      selectedTopic: "",
      newMessage: {
        text: "",
        images: []
      }
    };
  },
  created() {},
  methods: {
    validateMessage() {
      const button = document.querySelector(".btn-success");
      this.newMessage.text && this.selectedTopic !== ""
        ? (button.disabled = false)
        : (button.disabled = true);
    },
    createTicket() {
      let ticketData = this.getFormData(new FormData(), {
        name: "",
        userContact: "",
        id: this.selectedTopic.id,
        content: this.newMessage.text,
        images: this.newMessage.images.map(it => it.image)
      });

    //   let messageData = this.getFormData(new FormData(), {
    //     ticketId: this.selectedTopic.id,
    //     content: this.newMessage.text,
    //     images: this.newMessage.images.map(it => it.image)
    //   });

      SupportApi.createTicket(ticketData).then(() => {
        this.$router.push({
          name: 'support:list'
        });
      });
        // .then(SupportApi.createMessage(messageData));
    },
    createMessage() {
      SupportApi.createMessage(data);
    },
    getFormData(formData, data, previousKey) {
      if (data instanceof Object) {
        Object.keys(data).forEach(key => {
          const value = data[key];
          if (value instanceof Object && !Array.isArray(value)) {
            return this.getFormData(formData, value, key);
          }
          if (previousKey) {
            key = `${previousKey}[${key}]`;
          }
          if (Array.isArray(value)) {
            value.forEach(val => {
              formData.append(`${key}[]`, val);
            });
          } else {
            formData.append(key, value);
          }
        });
      }
      return formData;
    }
  }
});
</script>

<style lang="scss">
.form-group-textarea {
  position: relative;
}

.image-upload {
  position: absolute;
  right: 15px;
  bottom: 5px;
}
</style>



