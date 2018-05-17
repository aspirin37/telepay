<template>
  <div>
    <div class="flex-table"
         v-if="posts && posts.length">
      <div class="header-row">
        <div class="col-1">Номер</div>
        <div class="col">Время</div>
        <div class="col-3">Канал</div>
        <div class="col">Статус</div>
        <div class="col">Цена</div>
        <div class="col">Действия</div>
      </div>
      <div class="body-row"
           :key="post.postOrderId"
           v-for="post in posts"
           :class="{'text-muted':post.publishAt <= now}">
        <div class="col-1">{{post.humanReadableNumber}}</div>
        <div class="col h5">{{post.publishAt*1000 | parseDate}}</div>
        <div class="col-3">
          <div class="form-row">
            <div class="col-3">
              <avatar :src="'/images/channels/'+post.timeFrame.channel.telegramId+'/'+post.timeFrame.channel.photoId+'.jpg'"
                      :circle="true" /> </div>
            <div class="col-9 pl-4">
              <router-link :to="{
                            name:post.timeFrame.channel.userId === user.userId?'channels:update':'channels:show',
                            params:{id:post.timeFrame.channel.channelId}
                        }">
                <b>{{post.timeFrame.channel.title}}</b>
              </router-link>
              <br>{{post.timeFrame.channel.categories || 'Без категории'}}</div>
          </div>
        </div>
        <div class="col">
          <span v-if="post.status !== 3 && !post.isPosted">{{postStatuses[post.status]}}</span>
          <a v-else
             target="_blank"
             :href="`https://t.me/${post.timeFrame.channel.username}/${post.messageId}`">{{postStatuses[post.status]}}</a>
          <span v-show="post.status === 1"
                class="text-danger">{{post.declineReason}}</span>
        </div>
        <div class="col h5">{{post.price | centToRub}}</div>
        <div class="col">
          <button v-if="!isOut && post.status === 0"
                  class="btn btn-link m-0 p-0 text-success"
                  @click="approvePost(post)">
            <i class="fa fa-check fa-2x"></i>
          </button>
          <button v-if="!isOut && post.status === 0"
                  class="btn btn-link m-0 p-0 text-danger"
                  @click="declinePost(post)">
            <i class="fa fa-times fa-2x"></i>
          </button>
          <!-- <button class="btn btn-link m-0 p-0 text-warning"
                        @click="removePost(post)">
                        <i class="fa fa-trash fa-2x"></i>
                    </button> -->
          <button class="btn btn-link m-0 p-0 text-warning"
                  v-if="isOut">
            <i class="fa fa-refresh fa-2x text-primary"></i>
          </button>
          <button class="btn btn-link p-0 m-0 text-dark"
                  @click="togglePreview(post)"
                  @blur="togglePreview(post,false)">
            <i class="fa fa-2x"
               :class="post.showPreview?'fa-eye-slash':'fa-eye'"></i>
          </button>
          <div class="popover fade show bs-popover-bottom post-preview"
               v-show="post.showPreview">
            <div class="arrow"></div>
            <div class="popover-body">
              <post-preview :post="mapToPreview(post)"></post-preview>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h2 class="text-center"
        v-else>{{placeholder}}</h2>
  </div>
</template>
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
      postStatuses
    };
  },
  props: {
    posts: {
      type: Array,
      default () {
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
      });
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
          status: 2,
          timeFrameId: post.timeFrame.timeFrameId
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
          status: 1,
          timeFrameId: post.timeFrame.timeFrameId
        });
        this.getPosts();
      }
    }
  }
};
</script>