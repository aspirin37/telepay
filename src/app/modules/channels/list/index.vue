<template src="./index.html"></template>
<script>
import { mapState } from 'vuex';
import { ChannelApi } from '@services/api';
import channelStatuses from '@utils/channel-statuses';
import postStatuses from '@utils/post-statuses';
import { clone } from '@utils/clone';
import avatar from '@components/avatar';
import postList from '@components/post-list';
import postPreview from '@components/post-preview';

export default {
  components: { avatar, postList, postPreview },
  data() {
    return {
      channels: [],
      channelStatuses,
      postStatuses
    };
  },
  created() {
    this.getList();
  },
  computed: {
    ...mapState(['user']),
    now() {
      return moment().toDate();
    }
  },
  methods: {
    offerTime: ChannelApi.offerTime,
    mapToPreview(post) {
      let parsedBtns, parsedImgs;
      try {
        parsedBtns = JSON.parse(post.postTemplate.buttons);
      } catch (e) {
        parsedBtns = [post.postTemplate.buttons];
      }
      try {
        parsedImgs = JSON.parse(post.postTemplate.images);
      } catch (e) {
        parsedImgs = [post.postTemplate.images];
      }
      return {
        channel: post.channelOffer.channel.title,
        text: post.postTemplate.text,
        images: parsedImgs,
        buttons: parsedBtns,
        time: this.offerTime(post.channelOffer, true),
        publishAt: post.publishAt * 1000
      };
    },
    togglePreview(ch, post = {}, bool = !post.showPreview) {
      setTimeout(() => {
        ch.postOrders.forEach(el => {
          if (el.postOrderId !== post.postOrderId) el.showPreview = false;
        });
        post.showPreview = bool;
      });
    },
    async getList() {
      let { items, total } = await ChannelApi.list();

      items.forEach(ch => {
        ch.postOrders = ch.channelOffer.reduce((sum, offer) => {
          if (offer.postOrder) {
            let offerCopy = clone(offer);
            let channelCopy = clone(ch);
            delete offerCopy.postOrder;
            delete channelCopy.channelOffer;
            offerCopy.channel = channelCopy;
            offer.postOrder.forEach(post => {
              post.channelOffer = offerCopy;
            });
            sum.push(...offer.postOrder);
          }
          return sum;
        }, []);
        ch.cheapestOffer = ChannelApi.getCheapestOffer(ch);
        ch.showOrders = false;
      });

      this.channels = items;
    },
    toggleOrders(ch) {
      if (ch.postOrders && ch.postOrders.length) {
        ch.showOrders = !ch.showOrders;
      }
    }
  }
};
</script>
