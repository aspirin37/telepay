<template>
  <div @mousedown="mousePressed=true" @mouseup="mousePressed=false" class="timeframes">
    <div class="cell-row" :key="i" v-for="(dayOfWeek,i) in weekDays">
      <div class="cell d-flex" :class="{'border-0':!cell.y || !cell.x, 'bg-success':cell.selected, 'bg-light':cell.x && isWeekend(dayOfWeek) && !cell.selected}" :key="cell.y+cell.x" v-for="cell in cells[i]" @mouseover="handleMouseOver(cell)" @mousedown="handleMouseDown(cell)" @mouseup="handleMouseUp(cell)">
        <span class="align-self-center" :class="{'text-danger':isWeekend(dayOfWeek)}" v-if="!cell.x">{{dayOfWeek}}</span>
        <span class="align-self-end" v-if="cell.x && !cell.y">{{(cell.x-1) | getTime}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default Vue.extend({
  data() {
    return {
      mousePressed: false,
      initialCell: null,
      weekDays: ['', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
      cells: Array.from(Array(8).fill(Array.from(Array(25).keys()))).map((row, y) => row.map(i => ({ selected: false, x: i, y })))
    };
  },
  props: {
    value: {
      type: Array,
      default(){return []}
    },
    timeframes: {
      type: Array,
      default(){return []}
    }
  },
  watch: {
    value(val) {
      if (val && val instanceof Array) {
        // this.cells = val;
      }
    }
  },
  computed: {
    selectedCells() {
      this.cells.reduce((sum, row) => {
        let rowData = row.reduce((rowSum, cell) => {
          if (cell.selected) rowSum.push(cell);
          return rowSum;
        }, []);
        if (rowData.length) sum.push(rowData);
        return sum;
      }, []);
    }
  },
  methods: {
    isWeekend(dayOfWeek) {
      return dayOfWeek === 'сб' || dayOfWeek === 'вс';
    },
    handleMouseDown(cell) {
      if (cell && cell.x && cell.y) {
        cell.selected = !cell.selected;
        this.initialCell = cell;
      }
    },
    handleMouseOver(cell) {
      if (this.mousePressed && cell && this.initialCell) {
        this.cells.forEach(row => {
          row.forEach(c => {
            let overlap =
              // x+y+ == down/right
              (c.x <= cell.x && c.x >= this.initialCell.x && c.y <= cell.y && c.y >= this.initialCell.y) ||
              // x-y- == up/left
              (c.x >= cell.x && c.x <= this.initialCell.x && c.y >= cell.y && c.y <= this.initialCell.y) ||
              // x+y- == up/right
              (c.x <= cell.x && c.x >= this.initialCell.x && c.y >= cell.y && c.y <= this.initialCell.y) ||
              // x-y+ == down/left
              (c.x >= cell.x && c.x <= this.initialCell.x && c.y <= cell.y && c.y >= this.initialCell.y);
            if (!c.selected) {
              c.selected = c.x && c.y && overlap && this.initialCell.selected;
            } else if (overlap) {
              c.selected = c.x && c.y && this.initialCell.selected;
            }
          });
        });
      }
    },
    handleMouseUp(cell) {
      this.initialCell = null;
      this.$emit('input', this.selectedCells);
    }
  },
  filters: {
    getTime(val) {
      let hours = +val;
      if (hours < 10) {
        hours = '0' + hours;
      }
      return `${hours}:00`;
    }
  }
});
</script>
<style lang="scss">
.timeframes {
  .cell-row {
    display: flex;
    justify-content: space-around;
  }
  .cell {
    border: 1px solid #ccc;
    padding: 5px;
    white-space: nowrap;
    width: 100%;
    height: 50px;
    user-select: none;
  }
}
</style>
