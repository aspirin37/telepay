<template>
    <label class="search-input"
           ref="wrap">
        <span class="search-input__cleaner"
              v-if="after"
              @click="clearInput">
            <span class="search-input__cleaner-icon"
                  v-if="cleanerVisible && !multiple">&times;</span>
            <i v-if="!cleanerVisible || multiple"
               class="fa fa-chevron-down"
               aria-hidden="true"></i>
        </span>
        <button class="search-input__value"
                v-show="!searching"
                type="button"
                @focus="startSearching">
            {{ multiple? parsedMultiplePlaceholder :(selected ? selected.name : placeholder) }}
        </button>
        <input class="search-input__value"
               tabindex
               v-show="searching"
               type="text"
               v-model="searchString"
               @input="search"
               @keydown.down="scrollDropdown"
               @keydown.up="scrollDropdown"
               @keydown.enter="keyBoardSelect"
               ref="searchInput" />
        <transition name="fade">
            <div class="search-input__dropdown"
                 v-show="dropdownVisible"
                 ref="dropdown">
                <div v-for="(option, i) in innerOptions"
                     :key="i"
                     class="search-input__dropdown-item"
                     @click="select(option, i)"
                     :class="[getActive(option), getHovered(i)]">
                    <span class="search-input__option-name">{{ option.name }}</span>
                    <div class="float-right"
                         v-if="multiple">
                        <norm-checkbox v-model="option.selected" />
                    </div>
                </div>
                <div v-if="showNoDataOption"
                     class="search-input__dropdown-item">Ничего не найдено</div>
            </div>
        </transition>
    </label>
</template>
<script>
import normCheckbox from '@components/checkbox';
export default {
    components: { normCheckbox },
    props: {
        placeholder: {
            type: String,
            default: 'Выберите...'
        },
        multiple: {
            type: Boolean,
            default: false,
        },
        multiplePlaceholder: {
            type: Function,
            default (amount) {
                return `Выбрано пунктов:${amount}`
            }
        },
        options: {
            type: Array,
            default: () => []
        },
        searchAction: {
            type: Function,
            default (q) {
                let arr = this.options.filter(opt => new RegExp(q.toLowerCase()).test(opt.name.toLowerCase()));
                return Vue.Promise.resolve({ items: arr });
            }
        },
        value: {
            default: null
        },
        default: {
            type: String,
            default: ''
        },
        after: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            searching: false,
            searchString: '',
            selected: this.default ? { name: this.default } : null,
            dropdownVisible: false,
            cursor: -1,
            filteredOptions: [],
        };
    },
    created() {

        if (this.multiple) {
            if (this.value && this.value.length) {
                this.value.forEach(opt => { if (!opt.selected) Vue.set(opt, 'selected', true) })
            }
            if (this.options && this.options.length) {
                this.options.forEach(opt => { if (opt.selected === undefined) Vue.set(opt, 'selected', false) })
            }
        }
    },
    mounted() {
        window.addEventListener('click', this.inputBlur);
    },
    beforeDestroy() {
        window.removeEventListener('click', this.inputBlur);
    },
    watch: {
        innerOptions(val) {
            let entry = val[this.cursor];
            if (!entry) this.cursor = 0;
        },
        searchString(n) {
            this.$emit('input', n);
        }
    },
    computed: {
        innerOptions() {
            return this.searchString ? this.filteredOptions : this.options;
        },
        showNoDataOption() {
            return !this.filteredOptions.length && this.searchString.length > 0;
        },
        cleanerVisible() {
            return this.searchString !== '' || this.selected;
        },
        selectedItems() {
            return this.innerOptions.filter(o => o.selected)
        },
        parsedMultiplePlaceholder() {
            return this.multiplePlaceholder(this.selectedItems.length)
        }
    },
    methods: {
        search(e) {
            if (this.selected) this.selected = null;
            this.searchAction(this.searchString).then(res => {
                this.filteredOptions = res && res.items ? res.items : [];
            });
        },
        inputBlur(e) {
            if (!this.$refs.wrap.contains(e.target)) {
                this.stopSearching();
                this.hideDropdown();
            }
        },
        select(item, index) {
            if (!this.multiple) {
                this.$emit('input', item);
                this.selected = item;
                this.hideDropdown();
            } else {
                Vue.set(item, 'selected', !item.selected)
                setTimeout(() => this.$emit('input', this.selectedItems));
            }
            this.cursor = index;
            this.stopSearching();
            this.$emit('select', item);
        },
        keyBoardSelect() {
            this.select(this.innerOptions[this.cursor], this.cursor);
        },
        clearInput() {
            if (!this.multiple) {
                this.$emit('input', '');
                this.searchString = '';
                this.selected = null;
                this.filteredOptions = [];
                this.stopSearching();
                this.hideDropdown();
            }
        },
        startSearching() {
            if (!this.multiple) {
                this.searching = true;
            }
            this.$nextTick(() => {
                this.focusOnInput();
                this.showDropdown();
            });
        },
        stopSearching() {
            this.searching = false;
        },
        scrollUp(list) {
            this.cursor--;
            let activeItem = list.children[this.cursor];
            if (activeItem.offsetTop > list.scrollTop + list.offsetHeight)
                list.scrollTop = activeItem.offsetTop + activeItem.offsetHeight - list.offsetHeight;
            if (activeItem.offsetTop < list.scrollTop) list.scrollTop = activeItem.offsetTop;
        },
        scrollDown(list) {
            this.cursor++;
            let activeItem = list.children[this.cursor];
            if (activeItem.offsetTop < list.scrollTop) list.scrollTop = activeItem.offsetTop;
            if (activeItem.offsetTop + activeItem.offsetHeight >= list.offsetHeight + list.scrollTop)
                list.scrollTop = activeItem.offsetTop + activeItem.offsetHeight - list.offsetHeight;
        },
        scrollDropdown(e) {
            this.$nextTick(() => {
                if (e.keyCode === 40 && this.cursor < this.innerOptions.length - 1) this.scrollDown(this.$refs.dropdown);
                else if (e.keyCode === 38 && this.cursor >= 0) this.scrollUp(this.$refs.dropdown);
            });
        },
        getActive(option) {
            return this.selected && this.selected.id === option.id && !this.multiple ? 'search-input__dropdown-item_active' : '';
        },
        getHovered(option) {
            return this.cursor === option ? 'search-input__dropdown-item_hovered' : '';
        },
        showDropdown() {
            this.dropdownVisible = true;
        },
        hideDropdown() {
            this.dropdownVisible = false;
        },
        focusOnInput() {
            this.$refs.searchInput.focus();
        },
    },

};
</script>
<style lang="scss">
.search-input {
    position: relative;
    width: 100%;
    margin-bottom: 0;
    &__cleaner {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 50px;
        cursor: pointer;
        z-index: 20;
        right: 0;
        color: #000;
        background-color: #DEE2EE;
        border-radius: 0 3px 3px 0;
        overflow: hidden;
        &-icon {
            font-size: 2.6em;
        }
    }
    &__option-name {
        width: 90%;
        float: left;
        display: block;
    }
    &__value {
        background-color: #fff;
        text-align: left;
        display: block;
        outline: none;
        width: 100%;
        font-size: 15px;
        line-height: 20px;
        padding: 10px;
        color: #576077;
        border: 2px solid #DEE2EE;
        border-radius: 0.25rem;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        &:focus {
            outline: none;
        }
    }
    &__dropdown {
        position: absolute;
        overflow-y: auto;
        width: 100%;
        left: 0;
        z-index: 10;
        max-height: 200px;
        &-item {
            overflow: auto;
            background: #fff;
            padding: 10px;
            border-bottom: 1px solid #f5f5f5;
            font-size: 14px;
            cursor: pointer;
            user-select: none;
            &:hover,
            &_hovered,
            &_active {
                background: #f5f5f5;
                border-bottom: 1px solid #fff;
            }
        }
    }
}
</style>