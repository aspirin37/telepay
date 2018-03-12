<template lang="html">
  <div class="container py-3">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="text-medium-font mb-0">Проекты</h1>
      <router-link class="btn btn-primary" :to="{ name: 'projects-create' }">Новый проект</router-link>
    </div>
    <h3 class="text-muted">Исходящие</h3>
    <div class="">
      <project />
    </div>
  </div>
</template>

<script>
import project from '@components/project';
export default {
  components: { project }
}
</script>

<style lang="css">
</style>
