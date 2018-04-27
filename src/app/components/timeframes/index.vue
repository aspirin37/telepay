<template>
  <div @mousedown="mousePressed=true" @mouseup="mousePressed=false" class="timeframes">
    {{mousePressed}}
    <div class="cell-row" :key="i" v-for="(dayOfWeek,i) in ['пн','вт','ср','чт','пт','сб','вс']">
      <div class="cell" :key="hour" v-for="hour in Array.from(Array(24).keys())">
        {{dayOfWeek+' '+hour}}
      </div>
    </div>
  </div>
</template>
<script>
export default Vue.extend({
  data() {
    return { mousePressed: false };
  },
  props: {
    timeframes: {
      type: Array,
      default: []
    }
  },
  created() {},
  methods: {}
});
</script>
<style>
/* .timeframes {

} */
</style>
