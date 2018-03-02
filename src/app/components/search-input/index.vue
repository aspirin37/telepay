<template lang="html">
  <div :style="wrapStyles">
    <span @click="showDropdown" class="select-view">
      <span :style="cleanerWrapStyles" @click="cleanerClickHandler">
        <svg v-if="cleanerVisible" :style="cleanerStyles" @click.stop="clearInput" x="0px" y="0px" viewBox="0 0 21.9 21.9">
          <path d="M14.1,11.3c-0.2-0.2-0.2-0.5,0-0.7l7.5-7.5c0.2-0.2,0.3-0.5,0.3-0.7s-0.1-0.5-0.3-0.7l-1.4-1.4C20,0.1,19.7,0,19.5,0
          c-0.3,0-0.5,0.1-0.7,0.3l-7.5,7.5c-0.2,0.2-0.5,0.2-0.7,0L3.1,0.3C2.9,0.1,2.6,0,2.4,0S1.9,0.1,1.7,0.3L0.3,1.7C0.1,1.9,0,2.2,0,2.4 s0.1,0.5,0.3,0.7l7.5,7.5c0.2,0.2,0.2,0.5,0,0.7l-7.5,7.5C0.1,19,0,19.3,0,19.5s0.1,0.5,0.3,0.7l1.4,1.4c0.2,0.2,0.5,0.3,0.7,0.3
          s0.5-0.1,0.7-0.3l7.5-7.5c0.2-0.2,0.5-0.2,0.7,0l7.5,7.5c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l1.4-1.4c0.2-0.2,0.3-0.5,0.3-0.7
          s-0.1-0.5-0.3-0.7L14.1,11.3z"/>
        </svg>
        <svg v-if="!cleanerVisible" :style="cleanerStyles" x="0px" y="0px" viewBox="0 0 292.4 292.4">
          <path d="M286.9,69.4c-3.6-3.6-7.9-5.4-12.8-5.4H18.3c-5,0-9.2,1.8-12.9,5.4C1.8,73,0,77.3,0,82.2c0,4.9,1.8,9.2,5.4,12.8L133.3,223
          c3.6,3.6,7.9,5.4,12.9,5.4s9.2-1.8,12.8-5.4L286.9,95.1c3.6-3.6,5.4-7.9,5.4-12.8C292.4,77.3,290.5,73,286.9,69.4z"/>
        </svg>
      </span>
      <button v-if="!searching" ref="field" type="button" :style="selectValueStyles" @blur="onBlur" @keyup.down="incrementActiveOption"
        @keyup.up="decrementActiveOption" @keyup.enter="select(options[activeOption - 1])">
        {{ (current) ? current.name : placeholder }}
      </button>
      <input v-if="searching" type="text" v-model="searchString" :style="selectValueStyles">
    </span>
    <transition name="fade">
      <div class="select-dropdown" v-show="dropdownVisible" :style="dropdownStyles" ref="dropdown">
        <div v-for="option in options" class="select-dropdown__item" :style="dropdownItemStyles" @click="select(option)"
          @mouseover="setActiveOption(option.val)" :class="{ 'select-dropdown__item_active': getActive(option.val) }" :key="option.val">
          {{ option.name }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: 'Выберите...'
    },
    options: {
      type: Array
    }
  },
  data() {
    return {
      searching: false,
      searchString: '',
      current: null,
      dropdownVisible: false,
      activeOption: null
    }
  },
  methods: {
    scrollDropdown() {
      let dropdown = this.$refs.dropdown;
      let activeOption;
      Vue.nextTick(() => {
        activeOption = this.$refs.dropdown.children[this.activeOption - 1];
        if(dropdown.clientHeight <= (activeOption.getBoundingClientRect().top - dropdown.getBoundingClientRect().top)) {
          dropdown.scrollTop += activeOption.clientHeight;
        } else
        if(dropdown.getBoundingClientRect().top > activeOption.getBoundingClientRect().top) {
          dropdown.scrollTop -= activeOption.clientHeight;
        }
      })
    },
    decrementActiveOption() {
      if(this.activeOption > 1) {
        this.activeOption--;
        this.scrollDropdown();
      }
    },
    incrementActiveOption() {
      if(this.activeOption < this.options.length) {
        this.activeOption++;
        this.scrollDropdown();
      }
    },
    setActiveOption(idx) {
      if(this.activeOption !== idx) this.activeOption = idx;
    },
    select(item) {
      if(!item) {
        this.clearInput();
      } else if(this.value !== item.val) {
        this.$emit('input', item.val);
        this.$emit('change', item.val);
        this.activeOption = item.val;
        this.current = item;
        this.dropdownVisible = false;
      }
    },
    showDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
    getActive(option) {
      if(this.activeOption) return this.activeOption === option;
    },
    onBlur() {
      this.dropdownVisible = false;
    },
    clearInput() {
      this.$emit('change', '');
      this.$emit('input', '');
      this.current = null;
      this.activeOption = 0;
    },
    cleanerClickHandler() {
      if(!this.dropdownVisible) $refs.field.focus();
    }
  },
  computed: {
    cleanerVisible() {
      return this.searchString !== '';
    },
    wrapStyles() {
      return {
        position: 'relative'
      }
    },
    cleanerWrapStyles() {
      return {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        height: '38px',
        width: '38px',
        cursor: 'pointer',
        zIndex: 20,
        right: 0,
        backgroundColor: 'rgb(206, 212, 218)'
      }
    },
    cleanerStyles() {
      return {
        height: '16px',
        width: '16px',
        padding: '2px',
        fill: 'rgb(89, 98, 120)',
        transition: '.2s ease-in-out',
        transform: (!this.current && this.dropdownVisible) ? 'rotate(180deg)' : 'rotate(0deg)'
      }
    },
    dropdownStyles() {
      return {
        position: 'absolute',
        overflowY: 'scroll',
        width: '100%',
        left: 0,
        zIndex: 10,
        maxHeight: (41 * 4) + 'px'
      }
    },
    dropdownItemStyles() {
      return {
        background: '#fff',
        padding: '10px',
        borderBottom: '1px solid #f5f5f5',
        transition: '.1s ease-in-out',
        cursor: 'pointer',
      }
    },
    dropdownActiveItemStyles() {
      return {
        background: '#f5f5f5',
        borderBottom: '1px solid #fff'
      }
    },
    selectValueStyles() {
      return {
        display: 'block',
        textAlign: 'left',
        outline: 'none',
        width: '100%',
        padding: '0.375rem 0.75rem',
        fontSize: '1rem',
        lineHeight: 1.5,
        color: 'rgb(73, 80, 87)',
        backgroundColor: 'rgb(255, 255, 255)',
        backgroundClip: 'padding-box',
        border: '1px solid rgb(206, 212, 218)',
        borderRadius: '0.25rem',
        transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out'
      }
    }
  }
}
</script>

<style lang="css">
.select-dropdown__item_active {
  background: #f5f5f5;
  border-bottom: 1px solid #fff;
}
.fade-enter-active, .fade-leave-active {
  transition: .2s ease-in-out;
}
.fade-enter, .fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
