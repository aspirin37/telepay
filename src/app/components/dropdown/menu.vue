<template >
  <div class="dropp__body">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="css">
.dropp__body {
  /* position: relative; */
  background-color: #fff;
  min-width: 200px;
  box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}
.dropp__body:before {
  content: '';
  position: absolute;
  top: -18px;
  right: calc(50% - 17px);
  z-index: 60;
  border-style: solid;
  border-width: 0px 17.5px 18px;
  border-color: rgb(248, 249, 250) rgba(0, 0, 0, 0) rgb(248, 249, 250);
}
</style>
