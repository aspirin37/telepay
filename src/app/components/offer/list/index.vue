<template lang="html">
  <div class="">
    <div class="row">
      <scroll>
        <div v-for="day in days" :key="day.number" class="day" @click="$emit('change', day.value)">
          <div class="day__number">{{ day.number }}</div>
          <div class="day__weekday">{{ day.weekDay }}</div>
        </div>
      </scroll>
    </div>
    <list-item v-for="offer in offers" :key="offer.id" :data="offer"></list-item>
  </div>
</template>

<script>
import scroll from './scroll.vue';
import listItem from '../list-item';
export default {
  components: { scroll, listItem },
  props: {
    offers: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      days: [{
        number: '16 марта',
        weekDay: 'Пятница',
        value: 5
      },
      {
        number: '17 марта',
        weekDay: 'Суббота',
        value: 6
      },
      {
        number: '18 марта',
        weekDay: 'Воскресенье',
        value: 7
      },
      {
        number: '19 марта',
        weekDay: 'Понедельник',
        value: 1
      },
      {
        number: '20 марта',
        weekDay: 'Вторник',
        value: 2
      },
      {
        number: '21 марта',
        weekDay: 'Среда',
        value: 3
      },
      {
        number: '22 марта',
        weekDay: 'Четверг',
        value: 4
      },
      {
        number: '23 марта',
        weekDay: 'Пятница',
        value: 5
      },
      {
        number: '24 марта',
        weekDay: 'Суббота',
        value: 6
      },
      {
        number: '25 марта',
        weekDay: 'Воскресенье',
        value: 7
      },
      {
        number: '26 марта',
        weekDay: 'Понедельник',
        value: 1
      },
      {
        number: '27 марта',
        weekDay: 'Вторник',
        value: 2
      }]
    }
  }
}
</script>

<style lang="scss">
.day {
  display: inline-block;
  width: 130px;
  border-left: 1px solid #fff;
  border-right: 1px solid #fff;
  cursor: pointer;
  user-select: none;
  &__number {
    padding: 5px;
    border-bottom: 2px solid #fff;
  }
  &__weekday {
    padding: 5px;
  }
}
</style>
