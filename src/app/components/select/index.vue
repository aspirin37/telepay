<template lang="html">
  <div :style="wrapStyles">
    <span v-if="cleanerVisible" :style="cleanerWrapStyles" @click.stop="clearInput">
      <svg :style="cleanerStyles" x="0px" y="0px" viewBox="0 0 21.9 21.9">
        <path d="M14.1,11.3c-0.2-0.2-0.2-0.5,0-0.7l7.5-7.5c0.2-0.2,0.3-0.5,0.3-0.7s-0.1-0.5-0.3-0.7l-1.4-1.4C20,0.1,19.7,0,19.5,0
        c-0.3,0-0.5,0.1-0.7,0.3l-7.5,7.5c-0.2,0.2-0.5,0.2-0.7,0L3.1,0.3C2.9,0.1,2.6,0,2.4,0S1.9,0.1,1.7,0.3L0.3,1.7C0.1,1.9,0,2.2,0,2.4 s0.1,0.5,0.3,0.7l7.5,7.5c0.2,0.2,0.2,0.5,0,0.7l-7.5,7.5C0.1,19,0,19.3,0,19.5s0.1,0.5,0.3,0.7l1.4,1.4c0.2,0.2,0.5,0.3,0.7,0.3
        s0.5-0.1,0.7-0.3l7.5-7.5c0.2-0.2,0.5-0.2,0.7,0l7.5,7.5c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l1.4-1.4c0.2-0.2,0.3-0.5,0.3-0.7
        s-0.1-0.5-0.3-0.7L14.1,11.3z"/>
      </svg>
    </span>
    <button v-show="!searching" type="button" :style="selectValueStyles" @focus="startSearching" @click="startSearching" @blur="hideDropdown">
      {{ (current) ? current.name : placeholder }}
    </button>
    <input tabindex v-show="searching" type="text" v-model="searchString" :style="selectValueStyles" @focus="showDropdown"
      @blur="inputBlur" @input="search" @keydown.down="incrementActiveOption" @keydown.up="decrementActiveOption"
      @keydown.enter="keyBoardSelect" ref="searchInput">
    <transition name="fade">
      <div class="select-dropdown" v-show="dropdownVisible" :style="dropdownStyles" ref="dropdown">
        <div v-for="(option, i) in getOptions" class="select-dropdown__item" :style="dropdownItemStyles" @click="select(option)"
          :class="{ 'select-dropdown__item_active': getActive(i + 1) }" :key="option.value">
          {{ option.name }}
        </div>
        <div v-if="showNoDataOption" :style="dropdownItemStyles">Ничего не найдено</div>
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
      type: Array,
      default: () => ([]),
      validator: (value) => {
        if(value.length === 0) return value;
        value.forEach(prop => {
          if(!prop.hasOwnProperty('name') || !prop.hasOwnProperty('value'))
            throw new SyntaxError('Options should contains \'name\' and \'value\' properties');
        })
        return value
      }
    },
    searchAction: {
      type: Function
    }
  },
  data() {
    return {
      searching: false,
      searchString: '',
      current: null,
      dropdownVisible: false,
      activeOption: null,
      filteredOptions: []
    }
  },
  methods: {
    search(e) {
      if(this.current) this.current = null;
      if(this.searchAction && typeof this.searchAction === 'function') {
        this.filteredOptions = this.searchAction(this.searchString);
      }
    },
    inputBlur() {
      this.stopSearching();
      this.hideDropdown();
    },
    select(item) {
      if(!item) {
        this.clearInput();
      } else {
        this.$emit('input', item.name);
        this.setActiveOption(item.value);
        this.current = item;
        this.hideDropdown();
        this.stopSearching();
        this.focusOnInput();
        if(this.getOptions.length < this.activeOption) this.setActiveOption(0);
      }
    },
    keyBoardSelect() {
      this.select(this.getOptions[this.activeOption - 1]);
    },
    clearInput() {
      this.$emit('input', '');
      this.searchString = '';
      this.current = null;
      this.setActiveOption(0);
      this.filteredOptions = [];
    },
    startSearching() {
      this.searching = true;
      Vue.nextTick(() => {
        this.focusOnInput();
        this.showDropdown();
      });
    },
    stopSearching() {
      this.searching = false;
    },
    scrollDropdown() {
      let activeItem, list = this.$refs.dropdown;
      Vue.nextTick(() => {
        for(let prop of list.children) {
          if(prop.classList.contains('select-dropdown__item_active')) activeItem = prop;
        }
        if(activeItem) {
          let top = activeItem.getBoundingClientRect().top - list.getBoundingClientRect().top;
          let offsetTop = top + activeItem.offsetHeight;
          Vue.nextTick(() => {
            if(list.clientHeight <= offsetTop) {
              list.scrollTop += activeItem.offsetHeight;
            } else if(list.getBoundingClientRect().top > activeItem.getBoundingClientRect().top) {
              list.scrollTop -= activeItem.clientHeight;
            }
          })
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
      if(this.activeOption < this.getOptions.length) {
        this.activeOption++;
        this.scrollDropdown();
      }
    },
    setActiveOption(idx) {
      if(this.activeOption !== idx) this.activeOption = idx;
    },
    getActive(option) {
      if(this.activeOption) return this.activeOption === option;
    },
    //dropdown
    showDropdown() {
      this.dropdownVisible = true;
    },
    hideDropdown() {
      this.dropdownVisible = false;
    },
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
    focusOnInput() {
      this.$refs.searchInput.focus();
    }
  },
  watch: {
    getOptions(n) {
      let entry = 0;
      n.forEach((prop, i) => {
        if(prop.value === this.activeOption) {
          return entry = (i + 1);
        }
      })
      this.activeOption = entry;
    }
  },
  computed: {
    getOptions() {
      if(this.searchString) {
        return this.filteredOptions;
      } else {
        return this.options;
      }
    },
    showNoDataOption() {
      return (!this.filteredOptions.length && this.searchString.length > 0);
    },
    cleanerVisible() {
      return ((this.searchString !== '') || this.current);
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
        fill: 'rgb(89, 98, 120)'
      }
    },
    dropdownStyles() {
      return {
        position: 'absolute',
        overflowY: 'auto',
        width: '100%',
        left: 0,
        zIndex: 10,
        maxHeight: '200px'
      }
    },
    dropdownItemStyles() {
      return {
        background: '#fff',
        padding: '10px',
        borderBottom: '1px solid #f5f5f5',
        // transition: '.1s ease-in-out',
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
        padding: '0.375rem 2.975rem 0.375rem 0.75rem',
        fontSize: '1rem',
        lineHeight: 1.5,
        color: ' rgba(73, 80, 87, .7)',
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
input:focus {
  box-shadow: 0 0 0 0.2rem rgba(3, 169, 244, 0.25);
}
.select-dropdown__item:hover {
  background: #f5f5f5!important;
}
.select-dropdown__item_active {
  background: #f5f5f5!important;
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
