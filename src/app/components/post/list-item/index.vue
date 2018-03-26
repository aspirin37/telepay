<template lang="html">
  <div class="row">
    <div class="col-5">
      <post-preview />
    </div>
    <div class="col-7">
      <div class="d-flex bg-light py-2">
        <div class="col-3">
          Дата
        </div>
        <div class="col-3">
          Время
        </div>
        <div class="col-3">
          Статус
        </div>
        <div class="col-3 text-right">
          Цена
        </div>
      </div>
      <div class="d-flex py-2 mb-4">
        <div class="col-3">
          12.01.18
        </div>
        <div class="col-3">
          12.00
        </div>
        <div class="col-3">
          Выполнено
        </div>
        <div class="col-3 text-right">
          700р
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <button class="btn btn-primary">Заказать еще</button>
      </div>
    </div>
  </div>
</template>

<script>
import postPreview from '@components/post/preview';
export default {
  components: { postPreview }
};
</script>

<style lang="css">

</style>
