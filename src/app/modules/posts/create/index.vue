<template src="./index.html"></template>
<script>
import { mapState } from 'vuex';
import { ChannelApi, PostApi, CatalogApi } from '@services/api';
import channelList from '@components/channel-list';
import postPreview from '@components/post-preview';
import postInput from '@components/post-input';
import dateInput from '@components/date-input';
import { clone } from '@utils/clone';

export default {
  components: { postPreview, channelList, dateInput, postInput },
  data() {
    return {
      channels: [],
      finalSelectedChannels: [],
      selectedChannels: this.$route.params.selected || [],
      postData: {
        text: 'Текст...',
        buttons: [],
        images: []
      },
      post: {
        text: '',
        buttons: [],
        images: [],
        offerId: [],
        postTemplateId: '',
        channel: 'Название канала',
        publishAt: null
      }
    };
  },
  watch: {
    postData(val) {
      if (val) {
        let { text, images, buttons } = val;
        this.post.text = text;
        this.post.images = images;
        this.post.buttons = buttons;
      }
    }
  },
  computed: {
    dateConfig() {
      let self = this;
      return {
        ...this.$store.state.configs.date,
        enable: [
          function(date) {
            let weekday = date.getDay();
            if (weekday === 0) {
              weekday = 7;
            }
            if (!self.selectedChannels[0] || !self.selectedChannels[0].channelOffer || !self.selectedChannels[0].channelOffer[0]) {
              return true;
            }
            return weekday - 1 === self.selectedChannels[0].channelOffer[0].weekDay;
          }
        ]
      };
    },
    channelsToAdd() {
      if (this.channels.length) {
        if (this.post.publishAt) {
          return this.channels.reduce((sum, ch) => {
            if (this.selectedChannels.find(sCh => sCh.channelId === ch.channelId)) {
              return sum;
            }

            let filteredOffers = ch.channelOffer.filter(offer => {
              return offer.weekDay === this.post.publishAt.weekday();
            });

            if (filteredOffers.length) {
              let copy = clone(ch);
              copy.channelOffer = filteredOffers;
              sum.push(copy);
            }

            return sum;
          }, []);
        } else {
          return this.channels;
        }
      } else {
        return [];
      }
    },
    totalPrice() {
      return this.selectedChannels.reduce((sum, el) => {
        return sum + el.channelOffer.reduce((ofSum, offer) => ofSum + (offer.selected ? offer.price : 0), 0);
      }, 0);
    }
  },
  created() {
    this.getChannels();
    if (this.selectedChannels && this.selectedChannels.length) {
      this.post.publishAt = moment().weekday(this.selectedChannels[0].channelOffer[0].weekDay);
    }
  },
  methods: {
    createPostOrder() {
      let { buttons, images, offerId, publishAt, text } = this.post;
      buttons = JSON.stringify(buttons);
      images = JSON.stringify(images);
      offerId = this.finalSelectedChannels.reduce((sum, el) => {
        let d = el.channelOffer.map(offer => offer.channelOfferId);
        sum = sum.concat(d);
        return sum;
      }, []);

      PostApi.create({
        buttons,
        images,
        offerId,
        publishAt,
        text
      });
    },
    saveTemplate() {},
    async openCatalogPopup() {
      let self = this;
      let vm = new Vue({
        components: { channelList },
        data: {
          channels: self.channelsToAdd,
          selected: []
        },
        template: '<channel-list :channels="channels" v-model="selected"></channel-list>'
      });

      let swalOut = await swal({
        html: '<div id="modalMounter"></div>',
        width: '100%',
        animation: false,
        customClass: 'fade-in',
        showCancelButton: false,
        confirmButtonText: 'Добавить',
        onOpen() {
          vm.$mount('#modalMounter');
        }
      });
      if (swalOut && !swalOut.dismiss) {
        self.selectedChannels = self.selectedChannels.concat(vm.selected);
      }
    },
    async getChannels() {
      let { items, total } = await CatalogApi.filter({});
      this.channels = items.map(item => item.channelInfo);
    }
  }
};
</script>
