<template>
    <h1 class="mb-3 d-flex justify-content-between align-items-baseline">{{ text }}
        <small @click="$router.go(-1)" class="float-right pointer">
            <i class="fa fa-lg fa-chevron-left d-none d-md-inline"></i>
            <i class="fa fa-lg fa-angle-left d-inline d-md-none" style="vertical-align: -8%"></i> Назад</small>
    </h1>
</template>
<script type="text/javascript">
export default {
  props: ['text'],
  data() {
    return {};
  }
};
</script>