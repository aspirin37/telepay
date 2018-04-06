<template src="./index.html"></template>
<script>
import { mapState } from 'vuex';
import { ChannelApi, PostApi, CatalogApi } from '@services/api';
import channelList from '@components/channel-list';
import postPreview from '@components/post-preview';
import postInput from '@components/post-input';
import dateInput from '@components/date-input';
import avatar from '@components/avatar';
import normCheckbox from '@components/checkbox';
import { clone } from '@utils/clone';

export default {
  components: { avatar, normCheckbox, postPreview, channelList, dateInput, postInput },
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
        text: 'Текст...',
        buttons: [],
        images: [],
        offerId: [],
        postTemplateId: '',
        channel: 'Название канала',
        publishAt: moment()
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
    ...mapState(['configs']),
    offersPriceSum() {
      return this.selectedChannels.reduce((sum, el) => {
        return sum + el.channelOffer.reduce((ofSum, offer) => ofSum + offer.price, 0);
      }, 0);
    }
  },
  created() {
    this.getChannels();
  },
  methods: {
    createPostOrder() {
      let { buttons, images, offerId, publishAt, text } = this.post;
      buttons = JSON.stringify(buttons);
      images = JSON.stringify(images);
      offerId = this.finalSelectedChannels.reduce((sum, el) => {
        console.log(sum, el);
        let d = el.channelOffer.map(offer => offer.channelOfferId);
        sum = sum.concat(d);
        console.log(sum, el, d);
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
          channels: self.channels,
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
