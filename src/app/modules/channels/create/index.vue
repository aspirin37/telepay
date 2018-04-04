<template src="./index.html"></template>
<script>
import { ChannelsApi, CatalogApi } from '@services/api';
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
          После создания наш бот будет автоматически обновлять данные вашего канала`
      },
      usernameQuery: '',
      categories: [{ name: 'Первая категория', value: 1 }, { name: 'Вторая категория', value: 2 }, { name: 'Третья категория', value: 3 }],
      ws: null,
      isLoading: false,
      searchError: false
    };
  },
  created() {
    this.connectWebsocket();
    this.getCategories();
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
      this.ws = new WebSocket('ws://localhost:6633', LS.get('auth_key'));
      this.ws.onopen = () => {
        console.log('WebSocket opened');
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
        setTimeout(() => {
          if (res.content) {
            self.searchError = false;
            self.channel = res.content;
          } else {
            self.searchError = true;
          }
          self.isLoading = false;
        }, 500);
      };
    },

    getChannelInfo() {
      if (this.ws && this.ws.readyState === this.ws.OPEN) {
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
    },
    add() {
      ChannelsApi.create({
        username: this.parsedUsernameQuery.slice(1),
        ...this.channel
      }).then(res => {
        this.$router.push({ name: 'channels:list' });
      });
    }
  }
};
</script>
