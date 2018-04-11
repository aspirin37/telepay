<template src="./index.html"></template>

<script>
import { mapState } from 'vuex';
import { PostApi, ChannelApi } from '@services/api';
import postStatuses from '@utils/post-statuses';
import avatar from '@components/avatar';
export default {
  components: {
    avatar
  },
  data() {
    return {
      posts: {
        in: [],
        out: []
      },
      selected: this.$route.params.tab || 'inbound',
      postStatuses
    };
  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    this.getPosts();
  },
  methods: {
    offerTime: ChannelApi.offerTime,
    async getPosts() {
      let { items, total } = await PostApi.list();
      items.forEach(postOrder => {
        this.posts[postOrder.channelOffer.channel.userId === this.user.userId ? 'in' : 'out'].push(postOrder);
      });
    },
    async removePost(post) {
      let swalOut = await swal({
        type: 'question',
        title: 'Удаление поста для упрощения разработки',
        text: 'ТОЛЬКО ДЛЯ ДЕВА',
        confirmButtonText: 'Да, удалить!'
      });

      if (swalOut && !swalOut.dismiss && swalOut.value) {
        PostApi.delete(post.postOrderId);
      }
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
        this.getPosts();
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
        this.getPosts();
      }
    }
  }
};
</script>