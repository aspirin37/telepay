<template>
  <div class="container py-3">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="text-secondary mb-0">Посты</h1>
      <router-link class="btn btn-primary" :to="{ name: 'posts:create' }">Новый пост</router-link>
    </div>
    <ul class="nav nav-tabs">
      <li class="nav-item" @click="selected='inbound'">
        <a class="nav-link active" :class="{active:selected==='inbound'}" href="#">Active</a>
      </li>
      <li class="nav-item" @click="selected='inbound'">
        <a class="nav-link" :class="{active:selected==='inbound'}" href="#">Link</a>
      </li>
    </ul>

  </div>
</template>

<script>
import { PostApi } from '@services/api';
export default {
  components: {},
  data() {
    return {
      list: [],
      selected: this.$route.params.tab || 'inbound'
    };
  },
  async created() {
    let { items, total } = await PostApi.list();
    this.list = items;
  }
};
</script>
