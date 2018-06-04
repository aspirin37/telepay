<template >
  <div class="dropp__menu-item" :class="classes">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['title'],
  data() {
    return {
      clr: '#ccc'
    };
  },
  computed: {
    classes() {
      return [{ 'dropp__menu-item_header': this.title === '' }];
    }
  }
};
</script>

<style>
:root {
  --bg-body: #ccc;
}
.dropp__menu-item {
  padding: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  text-decoration: none;
}
.dropp__menu-item:hover {
  background-color: rgb(248, 249, 250) !important;
}
.dropp__menu-item_header,
.dropp__menu-item_header:hover {
  /* background-color: rgb(218, 224, 229); */
  cursor: default;
  font-weight: bold;
}
</style>
