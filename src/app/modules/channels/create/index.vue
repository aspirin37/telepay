<template src="./index.html"></template>
<script>
import { ChannelApi, CatalogApi, BotApi } from '@services/api';
import searchInput from '@components/search-input';
import avatar from '@components/avatar';
import heading from '@components/heading';
import WebStorage from '@utils/storage';
import { clone } from '@utils/clone';
import onOff from 'vue-on-off';
export default {
    components: {
        searchInput,
        avatar,
        onOff,
        heading
    },
    data() {
        return {
            auth_key: WebStorage.get('auth_key'),
            channel: {
                title: 'Заголовок вашего канала',
                description: `Здесь будет отображено описание вашего канала.
          Введите ссылку или юзернейм канала в поле ниже и мы автоматически получим информацию о канале.
          После добавления канала в сервисе наш бот будет автоматически обновлять данные вашего канала`,
                telegramId: 'default',
                photoId: 'default',
                isAutopost: false,
                isBotApproved: false,
                blackList: []
            },
            cachedChannel: null,
            usernameQuery: '',
            categories: [],
            // ws: null,
            isLoading: false,
            searchError: false,
            savedImageData: null
        };
    },
    created() {
        this.$store.commit('CHANGE_STATE', { key: 'is_advert', value: false });
        // this.connectWebsocket();
        this.getCategories();
    },
    // destroyed() {
    // if (this.ws && this.ws.readyState === this.ws.OPEN) {
    //   this.ws.close();
    // }
    // },
    computed: {
        isMobile() {
            return this.$mq == 'sm'
        },
        isDesktop() {
            return this.$mq != 'sm'
        },
        parsedUsernameQuery() {
            if (!this.usernameQuery || !this.usernameQuery.length) return false;
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
            let { items, total } = await CatalogApi.list();
            items.sort((a, b) => (a.name === '18+' || a.name === 'Азартные игры' ? -1 : 1))
            this.categories = items.map((it) => it.item);
            this.channel.blackList = this.channel.blackList.concat(items.filter(c => c.name === '18+' || c.name === 'Азартные игры'));
        },
        async getChannelInfo() {
            if (this.parsedUsernameQuery) {
                let usernameQuery = this.parsedUsernameQuery;
                clearTimeout(this.searchTimeout);
                let self = this;
                this.searchTimeout = setTimeout(async () => {
                    self.isLoading = true;
                    let channel = await BotApi.getChannelInfo(usernameQuery);
                    if (channel && !channel.error) {
                        self.searchError = false;
                        self.channel.title = channel.title;
                        self.channel.description = channel.description;
                        self.channel.telegramId = channel.telegramId;
                        self.channel.photoId = channel.photoId;
                        self.channel.isBotApproved = channel.isBotApproved;
                        self.channel.subscriberCount = channel.subscriberCount;
                    } else {
                        self.searchError = true;
                        self.channel = {
                            title: 'Заголовок вашего канала',
                            description: `Здесь будет отображено описание вашего канала.
          Введите ссылку или юзернейм канала в поле ниже и мы автоматически получим информацию о канале.
          После добавления канала в сервисе наш бот будет автоматически обновлять данные вашего канала`,
                            telegramId: 'default',
                            photoId: 'default',
                            isBotApproved: false,
                            isAutopost: self.channel.isAutopost,
                            blackList: self.channel.blackList
                        };
                    }
                    self.isLoading = false;
                }, 500);

            }
        },
        // connectWebsocket() {
        // TODO вынести сокет в миксин
        //   let botUrl;

        //   let self = this;
        //   let protocol = location.protocol === 'https:' ? 'wss' : 'ws';
        //   switch (process.env.url) {
        //     case 'loc':
        //       botUrl = `${protocol}://localhost:6633`;
        //       break;
        //     case 'dev':
        //       botUrl = `${protocol}://dev.telepay.io/ws`;
        //       break;
        //     default:
        //       botUrl = `${protocol}://telepay.io/ws`;
        //       break;
        //   }
        //   this.ws = new WebSocket(botUrl, WebStorage.get('auth_key'));
        //   this.ws.keepAlive = function() {
        //     if (self.ws && self.ws.readyState === self.ws.OPEN) {
        //       self.ws.send(0x9);
        //       setTimeout(self.ws.keepAlive, 10000);
        //     }
        //   };
        //   this.ws.onopen = () => {
        //     console.log('WebSocket opened');
        //     setTimeout(self.ws.keepAlive, 10000);
        //   };
        //   this.ws.onclose = ev => {
        //     switch (ev.code) {
        //       case 1005:
        //         console.log('WebSocket closed normally with code', ev.code);
        //         break;

        //       default:
        //         console.error('WebSocket closed unexpectedly with code', ev.code);
        //         this.wsError = true;
        //         break;
        //     }
        //   };
        //   this.ws.onmessage = function(msg) {
        //     let res;
        //     try {
        //       res = JSON.parse(msg.data);
        //     } catch (error) {
        //       res = {
        //         content: error
        //       };
        //       console.error(error);
        //     }
        //     if (res.content && !res.content.error) {
        //       self.searchError = false;
        //       self.channel.title = res.content.title;
        //       self.channel.description = res.content.description;
        //       self.channel.telegramId = res.content.telegramId;
        //       self.channel.photoId = res.content.photoId;
        //       self.channel.isBotApproved = res.content.isBotApproved;
        //       self.channel.subscriberCount = res.content.subscriberCount;
        //     } else {
        //       self.searchError = true;
        //       self.channel = {
        //         title: 'Заголовок вашего канала',
        //         description: `Здесь будет отображено описание вашего канала.
        //       Введите ссылку или юзернейм канала в поле ниже и мы автоматически получим информацию о канале.
        //       После добавления канала в сервисе наш бот будет автоматически обновлять данные вашего канала`,
        //         telegramId: 'default',
        //         photoId: 'default',
        //         isBotApproved: false,
        //         isAutopost: self.channel.isAutopost,
        //         blackList: self.channel.blackList
        //       };
        //     }
        //     self.isLoading = false;
        //   };
        // },

        // getChannelInfo() {
        // if (this.ws && this.ws.readyState === this.ws.OPEN) {
        //   if (this.parsedUsernameQuery) {
        //     let usernameQuery = this.parsedUsernameQuery;
        //     clearTimeout(this.searchTimeout);
        //     this.searchTimeout = setTimeout(() => {
        //       this.isLoading = true;
        //       this.ws.send(
        //         JSON.stringify({
        //           type: 'get::channelInfo',
        //           content: usernameQuery
        //         })
        //       );
        //     }, 500);
        //   }
        // }
        // },

        // imageErrorHandler(channel) {
        // if (channel.photoId !== 'default' && channel.telegramId !== 'default') {
        //     let {
        //         photoId,
        //         id
        //     } = channel;
        //     this.savedImageData = {
        //         photoId,
        //         id
        //     };
        //     channel.photoId = 'loader';
        //     channel.telegramId = 'loader';
        //     let int = setInterval(() => {
        //         channel.photoId = this.savedImageData.photoId;
        //         channel.telegramId = this.savedImageData.id;
        //     }, 1000);
        //     setTimeout(() => {
        //         clearInterval(int)
        //     }, 5000)
        // }
        // },
        addChannelHelp() {
            swal({
                width: this.$mq == 'sm' ? '90' : '60%',
                showCloseButton: true,
                showCancelButton: false,
                showConfirmButton: false,
                html: require('./help-popup.html')
            });
        },
        add() {
            let copy = clone(this.channel);
            copy.categoryId = copy.category && copy.category.categoryId;
            if (copy.blackList) copy.blackListIds = copy.blackList.map(c => c.categoryId);
            delete copy.category;
            delete copy.blackList;

            let username = this.parsedUsernameQuery.slice(1);

            ChannelApi.create({
                username,
                ...copy
            }).then(res => {
                this.$router.push({ name: 'channels:update', params: { username } });
            });
        }
    }
};
</script>