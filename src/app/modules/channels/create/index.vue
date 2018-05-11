<template src="./index.html"></template>
<script>
import {
  ChannelApi,
  CatalogApi
} from '@services/api';
import searchInput from '@components/search-input';
import avatar from '@components/avatar';
import LS from '@utils/local-storage';
import {
  clone
} from '@utils/clone';
import onOff from 'vue-on-off';
export default {
  components: {
    searchInput,
    avatar,
    onOff
  },
  data() {
    return {
      auth_key: LS.get('auth_key'),
      channel: {
        title: 'Заголовок вашего канала',
        description: `Здесь будет отображено описание вашего канала.
          Введите ссылку или юзернейм канала в поле ниже и мы автоматически заполним эти поля в соответствии с данными вашего канала.
          После создания наш бот будет автоматически обновлять данные вашего канала`,
        telegramId: 'default',
        photod: 'default',
        isAutopost: false
      },
      usernameQuery: '',
      categories: [],
      ws: null,
      wsError: false,
      isLoading: false,
      searchError: false,
      savedImageData: null
    };
  },
  created() {
    this.$store.commit('CHANGE_STATE', { key: 'is_advert', value: false })
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
      let {
        items,
        total
      } = await CatalogApi.list();
      this.categories = items;
    },
    connectWebsocket() {
      // TODO вынести сокет в миксин
      let botUrl;

      let self = this;
      let protocol = location.protocol === 'https:' ? 'wss' : 'ws';
      switch (process.env.url) {
        case 'loc':
          botUrl = `${protocol}://localhost:6633`;
          break;
        case 'dev':
          botUrl = `${protocol}://dev.telepay.io/ws`;
          break;
        default:
          botUrl = `${protocol}://telepay.io/ws`;
          break;
      }
      this.ws = new WebSocket(botUrl, LS.get('auth_key'));
      this.ws.keepAlive = function() {
        if (self.ws && self.ws.readyState === self.ws.OPEN) {
          self.ws.send(0x9);
          setTimeout(self.ws.keepAlive, 10000);
        }
      };
      this.ws.onopen = () => {
        console.log('WebSocket opened');
        setTimeout(self.ws.keepAlive, 10000);
      };
      this.ws.onclose = ev => {
        switch (ev.code) {
          case 1005:
            console.log('WebSocket closed normally with code', ev.code);
            break;

          default:
            console.error('WebSocket closed unexpectedly with code', ev.code);
            this.wsError = true;
            break;
        }
      };
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
        if (res.content && !res.content.error) {
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
          clearTimeout(this.searchTimeout);
          this.searchTimeout = setTimeout(() => {
            this.isLoading = true;
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
      if (channel.photoId !== 'default' && channel.telegramId !== 'default') {
        let {
          photoId,
          id
        } = channel;
        this.savedImageData = {
          photoId,
          id
        };
        channel.photoId = 'loading';
        channel.telegramId = 'loading';
        let int = setInterval(() => {
          channel.photoId = this.savedImageData.photoId;
          channel.telegramId = this.savedImageData.id;
        }, 1000);
        setTimeout(() => {
          clearInterval(int)
        }, 5000)
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
      let copy = clone(this.channel);
      let categoryId = copy.category && copy.category.categoryId;
      delete copy.category;

      ChannelApi.create({
        username: this.parsedUsernameQuery.slice(1),
        categoryId,
        ...copy
      }).then(res => {
        this.$router.push({
          name: 'channels:update',
          params: {
            channelId: res.channel_id
          }
        });
      });
    }
  }
};
</script>