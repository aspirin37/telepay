<template>
  <div class="telestat-link" @mouseover="showTooltip = true" @mouseout="showTooltip = false">
    <transition name="fade">
      <div class="telestat-link-tooltip" v-show="showTooltip">Посмотреть подробную статистику на
        <a :href="'https://telestat.io/'+channel" target="_blank" rel="noopener">telestat.io</a>
      </div>
    </transition>
    <a :href="'https://telestat.io/'+channel" target="_blank" rel="noopener">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 93.42 93.42">
        <defs>
          <linearGradient id="linear-gradient" x1="46.71" y1="93.42" x2="46.71" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#1c93d2"></stop>
            <stop offset="1" stop-color="#37acdf"></stop>
          </linearGradient>
        </defs>
        <circle fill="url(#linear-gradient)" cx="46.71" cy="46.71" r="46.71"></circle>
        <path class="jet" d="M134.45,244.14h0l-1,.92a4.13,4.13,0,0,0-2.72.9c-1.1.78-4.09,3.19-6.57,5.31A54.9,54.9,0,0,1,112.68,258c-2.11.67-6.77.5-6.77.5l-1.29,1.3,4.28,1.95-.65.65-4.27.7L84.5,260.18l.76-.78c.76-.79,1.85-1.9,1.7-2s-1.19.83-2.08,1.68-4.8,4.8-4.8,4.8l15.43,10.37-3.06,2.92L82.77,276,82,279,87,283.06l1.62-1.24c.38-.3.56-.2.56-.2s-3.28,4.63-3.44,4.88-.18.56.55,1.27,1,.62,1.17.5,3.56-2.38,3.56-2.38-3.45,3.7-4.76,5.37-.92,2-.92,2,.1.09.41,0a4.68,4.68,0,0,0,1.64-.95c1.66-1.31,5.37-4.75,5.37-4.75l-2.39,3.56c-.12.18-.22.43.5,1.16s1,.71,1.27.55,4.88-3.44,4.88-3.44.11.18-.19.57-1.25,1.61-1.25,1.61l4.06,5.06,3-.78-1.08-9.69,2.91-3.06,10.37,15.43s4-3.91,4.8-4.8,1.83-1.94,1.69-2.08-1.26.94-2,1.7l-.79.76-2.92-19.48.7-4.27.65-.65,1.95,4.28,1.3-1.29s-.16-4.65.51-6.77a54.64,54.64,0,0,1,6.71-11.43c2.12-2.47,4.53-5.47,5.32-6.56a4.18,4.18,0,0,0,.89-2.73l.93-1.05h0a.06.06,0,0,0,0-.08A.06.06,0,0,0,134.45,244.14Z" transform="translate(-62.91 -222.67)"></path>
      </svg>
      <span class="text-secondary telestat-link-text">{{text}}</span>
    </a>
  </div>
</template>
<script>
export default Vue.extend({
  data() {
    return { showTooltip: false };
  },
  props: {
    channel: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  },
  created() {},
  methods: {}
});
</script>
<style>
.telestat-link-tooltip {
  position: absolute;
  background: rgba(0, 0, 0, 0.7);
  padding: 5px 10px;
  line-height: 1.2;
  color: #fff;
  font-weight: 300;
  font-size: 14px;
  top: 30px;
  left: 30px;
  border-radius: 8px;
  border-top-left-radius: 0;
}
.telestat-link-tooltip::before {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 100px 100px 0px;
  border-color: transparent transparent #007bff transparent;
}
.telestat-link svg {
  width: 30px;
}
.telestat-link-text {
  position: absolute;
  top: 3px;
  left: 55px;
}
.telestat-link .jet {
  fill: #fff;
}
</style>
