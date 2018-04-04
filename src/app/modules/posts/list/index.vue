<template lang="html">
  <div class="container py-3">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="text-secondary mb-0">Посты</h1>
      <router-link class="btn btn-primary" :to="{ name: 'posts:create' }">Новый пост</router-link>
    </div>
    <h3 class="text-muted">Исходящие</h3>
    <div class="">
      <post />
    </div>
  </div>
</template>

<script>
import post from '@components/post/list-item';
import { PostApi } from '@services/api';
export default {
  components: { post },
  data() {
    return {
      list: []
    };
  },
  async created() {
    let { items, total } = await PostApi.list();
    this.list = items;
  }
};
</script>
