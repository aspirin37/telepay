<template src="./index.html"></template>
<script>
import avatar from '@components/avatar';
import postPreview from '@components/post-preview';
import postStatuses from '@utils/post-statuses';
import { PostApi, ChannelApi } from '@services/api';
export default {
  components: {
    avatar,
    postPreview
  },
  data() {
    return {
      postStatuses,
      statusChangedByUser: false
    };
  },
  props: {
    posts: {
      type: Array,
      default() {
        return [];
      }
    },
    isOut: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: 'Нет постов'
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    now() {
      return Math.round(Date.now() / 1e3);
    }
  },
  created() {
    this.setShowPreview();
  },
  updated() {
    this.setShowPreview();
  },
  methods: {
    timeFrameDates: ChannelApi.timeFrameDates,
    setShowPreview() {
      if (this.posts && this.posts.length) {
        this.posts.forEach(post => {
          if (post.showPreview === undefined) Vue.set(post, 'showPreview', false);
        });
      }
    },
    togglePreview(post = {}, bool = !post.showPreview) {
      setTimeout(() => {
        this.posts.forEach(el => {
          if (el.postOrderId !== post.postOrderId) el.showPreview = false;
        });
        post.showPreview = bool;
      }, 100);
    },
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
        channel: post.timeFrame.channel.title,
        text: post.postTemplate.text,
        images: parsedImgs,
        buttons: parsedBtns,
        time: this.timeFrameDates(post.timeFrame, true),
        publishAt: post.publishAt * 1000
      };
    },
    async repeatPost(post) {
      let { text, images, buttons } = this.mapToPreview(post);
      let postToSave = {
        timeFrameId: [post.timeFrame.timeFrameId],
        postTemplateId: post.postTemplate.postTemplateId,
        channel: 'Название канала',
        publishAt: moment().format('YYYY-MM-DD')
      };
      this.$store.dispatch('SAVE_POST', postToSave);
      this.$router.push({ name: 'posts:create' });
    },
    async removePost(post) {
      let swalOut = await swal({
        type: 'question',
        title: 'Удалить пост?',
        confirmButtonText: 'Да, удалить!'
      });
      if (swalOut && !swalOut.dismiss && swalOut.value) {
        await PostApi.delete(post.postOrderId);
        this.$root.$emit('posts_list:getPosts');
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
          status: 2,
          timeFrameId: post.timeFrame.timeFrameId
        });
        this.$root.$emit('posts_list:getPosts');
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
          status: 1,
          timeFrameId: post.timeFrame.timeFrameId
        });
        this.$root.$emit('posts_list:getPosts');
      }
    }
  }
};
</script>