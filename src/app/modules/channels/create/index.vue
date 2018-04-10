<template src="./index.html"></template>
<script>
import { ChannelApi, CatalogApi } from '@services/api';
import searchInput from '@components/search-input';
import avatar from '@components/avatar';
import LS from '@utils/local-storage';
import onOff from 'vue-on-off';
export default {
  components: { searchInput, avatar, onOff },
  data() {
    return {
      channel: {
        title: 'Заголовок вашего канала',
        description: `Здесь будет отображено описание вашего канала.
          Введите ссылку или юзернейм канала в поле ниже и мы автоматически заполним эти поля в соответствии с данными вашего канала.
          После создания наш бот будет автоматически обновлять данные вашего канала`,
        telegramId: 'default',
        photod: 'default'
      },
      usernameQuery: '',
      categories: [{ name: 'Первая категория', value: 1 }, { name: 'Вторая категория', value: 2 }, { name: 'Третья категория', value: 3 }],
      ws: null,
      wsError: false,
      isLoading: false,
      searchError: false,
      savedImageData: null
    };
  },
  created() {
    this.connectWebsocket();
    this.getCategories();
  },
  destroyed() {
    if (this.ws && this.ws.readyState === this.ws.OPEN) {
      this.ws.close();
    }
  },
  computed: {
    parsedUsernameQuery() {
      if (/^https?.+\/(.+)/.test(this.usernameQuery) || /.*t\.me\/(.+)/.test(this.usernameQuery)) {
        let match = this.usernameQuery.match(/(.+)\/(.+)$/);
        console.log(match);
        if (match && match[2]) {
          return (match[2][0] === '@' ? '' : '@') + match[2];
        } else {
          return '';
        }
      } else if (this.usernameQuery[0] === '@') {
        return this.usernameQuery;
      } else {
        return '@' + this.usernameQuery;
      }
    }
  },
  methods: {
    async getCategories() {
      let { items, total } = await CatalogApi.list();
      this.categories = items;
    },
    connectWebsocket() {
      let botUrl;
      switch (process.env.url) {
        case 'loc':
          botUrl = `ws://localhost:6633`;
          break;
        case 'dev':
          botUrl = `ws://dev.telepay.io/ws`;
          break;
        default:
          botUrl = `ws://telepay.io/ws`;
          break;
      }
      this.ws = new WebSocket(botUrl, LS.get('auth_key'));
      this.ws.onopen = () => {
        console.log('WebSocket opened');
      };
      this.ws.onclose = ev => {
        switch (ev.code) {
          case 1006:
            console.log('WebSocket closed normally with code', ev.code);
            break;

          default:
            console.error('WebSocket closed unexpectedly with code', ev.code);
            this.wsError = true;
            break;
        }
      };
      let self = this;
      this.ws.onmessage = function(msg) {
        let res;
        try {
          res = JSON.parse(msg.data);
        } catch (error) {
          res = {
            content: error
          };
          console.error(error);
        }
        if (res.content) {
          self.searchError = false;
          self.channel = res.content;
        } else {
          self.searchError = true;
        }
        self.isLoading = false;
      };
    },

    getChannelInfo() {
      if (this.ws && this.ws.readyState === this.ws.OPEN) {
        if (this.parsedUsernameQuery) {
          let usernameQuery = this.parsedUsernameQuery;
          this.isLoading = true;
          clearTimeout(this.searchTimeout);
          this.searchTimeout = setTimeout(() => {
            this.ws.send(
              JSON.stringify({
                type: 'get::channelInfo',
                content: usernameQuery
              })
            );
          }, 500);
        }
      }
    },
    imageErrorHandler(channel) {
      if (channel.photod !== 'default' && channel.telegramId !== 'default') {
        let { photod, id } = channel;
        this.savedImageData = { photod, id };
        channel.photoId = 'loading';
        channel.telegramId = 'loading';
        setTimeout(() => {
          channel.photoId = this.savedImageData.photod;
          channel.telegramId = this.savedImageData.id;
        }, 3000);
      }
    },
    addChannelHelp() {
      swal({
        width: '60%',
        showCancelButton: false,
        showConfirmButton: false,
        html: require('./help-popup.html')
      });
    },
    add() {
      ChannelApi.create({
        username: this.parsedUsernameQuery.slice(1),
        ...this.channel
      }).then(res => {
        this.$router.push({ name: 'channels:list' });
      });
    }
  }
};
</script>
