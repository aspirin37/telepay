<template lang="html">
  <div class="container py-3">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="text-medium-font mb-0">Мои каналы</h1>
      <router-link class="btn btn-primary" :to="{ name: 'new-channel' }">Добавить канал</router-link>
    </div>
    <channels :channels="channels" :show-last-col="true" :show-first-col="false" />
  </div>
</template>

<script>
import channels from '@components/channels';
export default {
  components: { channels },
  data() {
    return {
      channels: [{
        name: 'Первый канал',
        about: 'Это первый канал',
        subscribers: 20000,
        er: 20,
        price: 3000,
        like: false,
        category: 'Первая категория'
      },
      {
        name: 'Второй канал',
        about: 'Это второй канал Это второй канал',
        subscribers: 40000,
        er: 40,
        price: 6000,
        like: true,
        category: 'Вторая категория'
      },
      {
        name: 'Третий канал',
        about: 'Это третий канал Это третий канал Это третий канал',
        subscribers: 60000,
        er: 60,
        price: 9000,
        like: false,
        category: 'Третья категория'
      }]
    }
  }
}
</script>

<style lang="css">
</style>
