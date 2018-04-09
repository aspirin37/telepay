<template>
  <div class="container py-3 posts">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="text-secondary mb-0">Посты</h1>
      <router-link class="btn btn-primary" :to="{ name: 'posts:create' }">Новый пост</router-link>
    </div>
    <ul class="nav nav-tabs">
      <li class="nav-item" @click="selected='inbound'">
        <a class="nav-link" :class="{active:selected==='inbound'}" href="#">Входящие</a>
      </li>
      <li class="nav-item" @click="selected='outbound'">
        <a class="nav-link" :class="{active:selected==='outbound'}" href="#">Исходящие</a>
      </li>
    </ul>
    <div class="tab-content mt-3">
      <div class="tab-pane fade" :class="{'show active':selected==='inbound'}">
        <div class="flex-table">
          <div class="header-row">
            <div class="col">Дата</div>
            <div class="col">Время</div>
            <div class="col">Канал</div>
            <div class="col">Статус</div>
            <div class="col">Цена</div>
            <div class="col">Действия</div>
          </div>
          <div class="body-row" :key="post.postOrderId" v-for="post in posts.in">
            <div class="col">{{post.publishAt*1000 | parseDate(true)}}</div>
            <div class="col"></div>
            <div class="col"></div>
            <div class="col">{{postStatuses[post.status]}}</div>
            <div class="col">{{post.price | centToRub}}</div>
            <div class="col">
              <i class="fa fa-check fa-2x text-success" v-show="post.status === 2"></i>
              <i class="fa fa-times fa-2x text-danger" v-show="post.status === 2"></i>
              <i class="fa fa-eye fa-2x"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-pane fade" :class="{'show active':selected==='outbound'}">
        <div class="flex-table">
          <div class="header-row">
            <div class="col">Дата</div>
            <div class="col">Время</div>
            <div class="col">Канал</div>
            <div class="col">Статус</div>
            <div class="col">Цена</div>
            <div class="col">Действия</div>
          </div>
          <div class="body-row" :key="post.postOrderId" v-for="post in posts.out">
            <div class="col">{{post.publishAt*1000 | parseDate(true)}}</div>
            <div class="col"></div>
            <div class="col"></div>
            <div class="col">{{postStatuses[post.status]}}</div>
            <div class="col">{{post.price | centToRub}}</div>
            <div class="col">
              <i class="fa fa-refresh fa-2x text-primary"></i>
              <i class="fa fa-eye fa-2x"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { PostApi } from '@services/api';
import postStatuses from '@utils/post-statuses';
export default {
  data() {
    return {
      posts: { in: [], out: [] },
      selected: this.$route.params.tab || 'inbound',
      postStatuses
    };
  },
  computed: {
    ...mapState(['user'])
  },
  async created() {
    let { items, total } = await PostApi.list();
    items.forEach(postOrder => {
      this.posts[postOrder.userId === this.user.id ? 'out' : 'in'].push(postOrder);
    });
  }
};
</script>
