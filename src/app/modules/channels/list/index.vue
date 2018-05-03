<template src="./index.html"></template>
<script>
import { mapState } from 'vuex';
import { ChannelApi, PostApi } from '@services/api';
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
    timeFrameDates: ChannelApi.timeFrameDates,
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
        time: this.timeFrameDates(post.channelOffer, true),
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
        if (ch.channelOffer) {
          ch.postOrders = ch.channelOffer.reduce((sum, offer) => {
            if (offer.postOrder) {
              let offerCopy = clone(offer);
              let channelCopy = clone(ch);
              delete offerCopy.postOrder;
              delete channelCopy.channelOffer;
              offerCopy.channel = channelCopy;
              offer.postOrder.forEach(post => {
                post.channelOffer = offerCopy;
                post.showPreview = false;
              });
              sum.push(...offer.postOrder);
            }
            return sum;
          }, []);
        }
        ch.cheapestOffer = ChannelApi.getCheapestTimeFrame(ch);
        ch.showOrders = false;
      });

      console.log(items);
      this.channels = items;
    },
    async approvePost(post) {
      let swalOut = await swal({
        type: 'success',
        title: 'Подтвердить размещение поста?',
        confirmButtonText: 'Да, подтвердить!'
      });

      if (swalOut && !swalOut.dismiss && swalOut.value) {
        await PostApi.updateStatus(post.postOrderId, {
          status: 0
        });
        this.getList();
      }
    },
    async declinePost(post) {
      let swalOut = await swal({
        type: 'error',
        title: 'Отклонить размещение поста?',
        confirmButtonText: 'Да, отклонить!'
      });

      if (swalOut && !swalOut.dismiss && swalOut.value) {
        await PostApi.updateStatus(post.postOrderId, {
          status: 1
        });
        this.getList();
      }
    },
    toggleOrders(ch) {
      if (ch.postOrders && ch.postOrders.length) {
        ch.showOrders = !ch.showOrders;
      }
    }
  }
};
</script>
