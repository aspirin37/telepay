<template src="./index.html"></template>
<script>
import { SupportApi } from '@services/api';
import { clone } from '@utils/clone';
import StarRating from 'vue-star-rating';
import searchInput from '@components/search-input';
import heading from '@components/heading';
import supportTextarea from '@components/support-textarea';
import topics from '@utils/support-topics';

export default Vue.extend({
  components: {
    heading,
    searchInput,
    supportTextarea,
    StarRating
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
      topics,
      ticketStatus: this.$route.params.status,
      ticketId: this.$route.query.ticketId || null,
      rating: 0,
      isRated: false,
      isRatingDisabled: false,
      messages: [],
      topic: null,
      selectedTopic: '',
      newMessage: {
        text: '',
        images: []
      }
    };
  },
  computed: {
    messagesReversed() {
      let copy = clone(this.messages);
      return copy.reverse();
    }
  },
  created() {
    if (this.$route.query.ticketId) {
      this.getMessages();
    }
    if (this.$route.params.rating) {
      this.rating = Number(this.$route.params.rating);
      this.isRatingDisabled = true;
    }
    if (this.$route.params.topic) {
      this.selectedTopic = this.topics[this.$route.params.topic];
    }
  },
  methods: {
    setRating(rating) {
      let data = { rating };
      SupportApi.setRating(this.ticketId, data).then(() => {
        this.isRated = true;
      });
    },
    isAuthorNeeded(message, i, messages) {
      if (i == 0) {
        return true;
      }
      while (i < messages.length) {
        return message.isSupport != messages[i - 1].isSupport ? true : false;
      }
    },
    isAuthorNeededMobile(message, i, messages) {
      if (i == messages.length - 1) {
        return true;
      }
      while (i < messages.length - 1) {
        return message.isSupport != messages[i + 1].isSupport ? true : false;
      }
    },
    async getMessages() {
      let { items } = await SupportApi.getList();
      let ticket = items.filter(it => it.ticketId == this.ticketId)[0];
      this.messages = ticket.messages;
      this.topic = this.topics[ticket.topic].name;

      this.scrollChatDown();

      this.messages.sort((a, b) => b.createdAt - a.createdAt).forEach(it => {
        it.createdAt = moment.unix(it.createdAt).format('DD.MM.YYYY - HH:mm');
      });
    },
    validateMessage() {
      const button = document.querySelector('.btn-success');
      (this.newMessage.text && this.selectedTopic !== '') || (this.newMessage.text && this.ticketId)
        ? (button.disabled = false)
        : (button.disabled = true);
    },
    createTicket() {
      let ticketData = this.getFormData(new FormData(), {
        name: '',
        userContact: '',
        topic: this.topics.indexOf(this.selectedTopic),
        content: this.newMessage.text,
        images: this.newMessage.images.map(it => it.image)
      });

      SupportApi.createTicket(ticketData).then(() => {
        this.$router.push({
          name: 'support:list'
        });
      });
    },
    createMessage(mode) {
      if (this.newMessage.text) {
        let messageData = this.getFormData(new FormData(), {
          ticketId: this.ticketId,
          content: this.newMessage.text,
          images: this.newMessage.images.map(it => it.image)
        });
        SupportApi.createMessage(messageData).then(() => {
          let message = {
            content: this.newMessage.text,
            files: this.newMessage.images.map(it => it.decoded),
            createdAt: moment().format('DD.MM.YYYY - HH:mm'),
            isSupport: false,
            isJustCreated: true
          };

          this.messages.unshift(message);
          this.newMessage.text = '';
          this.newMessage.images = [];

          this.scrollChatDown();
        });
      }
    },
    scrollChatDown() {
      if (this.$mq == 'sm') {
        setTimeout(() => {
          this.$nextTick(function() {
            const chat = document.querySelector('.support-chat');
            chat.scrollTop = chat.scrollHeight;
          });
        }, 200);
      }
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
    },
    showImage(evt) {
      swal({
        width: '80%',
        showCloseButton: true,
        showCancelButton: false,
        showConfirmButton: false,
        animation: false,
        imageUrl: evt.target.src
      });
      document.querySelector('.swal2-close').blur();
    }
  }
});
</script>
<style lang="scss" scoped>
@import '~bootstrap/scss/bootstrap.scss';

.support-chat {
  display: flex;
  flex-direction: column;
  // //   flex-basis: calc(100vh - (210px));
  //     /*height: calc(100vh - 75vw);*/
  //   flex-basis: 100vh;
  //   margin-top: -210px;
  //   padding-top: 210px;
  //   -moz-box-sizing: border-box;
  //   box-sizing: border-box;
  flex-grow: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  &__wrapper {
    display: flex;
    flex-direction: column;
    margin-top: auto;
    padding-bottom: 70px;
  }
}

.support-chat-container {
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding-top: 77px;
  padding-bottom: 60px;
  //   overflow-y: auto;
  -webkit-overflow-scrolling: auto;
}

.support-textarea-mobile {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  padding: 17px;
  padding-top: 14px;
  border: none;
  outline: none;
  border-top: 1px solid #e5e5e5;
  box-sizing: border-box;
  resize: none;
  border-radius: 0;
  background-color: #f6f7fb;
  font-size: 16px;
  line-height: 20px;
  color: rgba(87, 96, 119, 0.5);

  &::-webkit-input-placeholder {
    color: rgba(87, 96, 119, 0.5);
  }

  &::-moz-placeholder {
    color: rgba(87, 96, 119, 0.5);
  }
  &:-ms-input-placeholder {
    color: rgba(87, 96, 119, 0.5);
  }
  &:-moz-placeholder {
    color: rgba(87, 96, 119, 0.5);
  }
}

.form-group-textarea {
  position: relative;
}

.image-upload {
  position: absolute;
  right: 15px;
  bottom: 5px;
}

.rating {
  position: relative;

  &__wrapper {
    position: absolute;
    top: 0;
    left: 0;
  }
}

.message {
  padding-left: 0;
  padding-right: 0;

  &__author {
    font-size: 16px;
    line-height: 20px;
    color: #576077;
  }

  &__content {
    border: 2px solid #dee2ee;
    color: #576077;
    font-size: 0.9rem;
    line-height: 20px;
    padding: 10px;
    padding-bottom: 3px;
    border-radius: 0 0.5rem 0.5rem 0.5rem;

    &--support {
      border-radius: 0.5rem 0 0.5rem 0.5rem;
      border-color: #ffc107;
    }

    &--support-reversed {
      border-color: #ffc107;
      border-radius: 0 0.5rem 0.5rem 0.5rem !important;
    }

    &--reversed {
      border-radius: 0.5rem 0 0.5rem 0.5rem;
    }
  }

  &__date {
    color: #dee2ee;
  }

  &__images {
    max-width: 100%;
  }

  &__image {
    border-radius: 0.25rem;
  }
}
</style>