<template lang="html">
  <div class="d-flex py-3 channel w-100">
    <div class="col-1 d-flex justify-content-around align-items-center" v-if="showFirstCol">
      <input type="checkbox">
      <i class="fa fa-star" :class="{ active: data.like }" aria-hidden="true"></i>
    </div>
    <div class="col-3 d-flex">
      <img class="col-3 rounded-circle avatar" src="http://hash-cloud.ru/tg/avatars/26dcfab7c4ed53275d1aae77f4743068.jpg" alt="">
      <div class="col-9">
        <p class="m-0 font-weight-500 text-medium-font">{{ data.name }}</p>
        <p class="m-0 font-weight-light text-light-font">{{ data.category }}</p>
      </div>
    </div>
    <div class="col-3 d-flex align-items-center">
      {{ data.about }}
    </div>
    <div class="col-2 d-flex align-items-center font-weight-500 text-medium-font">
      {{ data.subscribers | cutSum }}
    </div>
    <div class="col-2 d-flex align-items-center font-weight-500 text-medium-font">
      {{ data.er }}%
    </div>
    <div class="col-1 d-flex align-items-center font-weight-500 text-medium-font">
      {{ data.price }}₽
    </div>
    <div class="col-1 d-flex justify-content-around align-items-center" v-if="showLastCol">
      <i class="fa fa-pencil" aria-hidden="true"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object
    },
    showFirstCol: {
      type: Boolean,
      default: true
    },
    showLastCol: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="css">
</style>
