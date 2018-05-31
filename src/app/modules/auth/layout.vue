<template>
  <div class="container-fluid">
    <div class="row auth-box align-items-center justify-content-center ">
      <div class="col"></div>
      <div class="col-xs-10 col-sm-8 col-md-6 col-lg-5 col-xl-4 text-center">
        <div class="logo" v-once v-html="Logo"></div>
        <router-view></router-view>
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>
<script>
import Logo from '@assets/logo.svg';
export default Vue.extend({
  data() {
    return {
      Logo
    };
  }
});
</script>
