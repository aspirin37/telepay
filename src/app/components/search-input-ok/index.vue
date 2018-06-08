<template>
    <div>
        <transition name="fade-2">
            <div class="search-overlay"
                 v-show="isSearching"></div>
        </transition>
        <div class="search-control-wrapper"
             :class="{'is-control-wrapper-searching': isSearching}">
            <input class="form-control search-control"
                   @focus="startSearching"
                   @keyup.enter="stopSearching"
                   @keyup.esc="stopSearching"
                   v-model="searchText"
                   type="text"
                   :placeholder="placeholderComputed" />
            <div class="search-cancel"
                 @click="searchText = ''"
                 v-html="CancelBtn"
                 v-if="searchText && isSearching"></div>
        </div>
    </div>
</template>
<script type="text/javascript">
import CancelBtn from '@assets/crest-01.svg';
import SearchGlass from '@assets/find.svg';

export default {
    props: ['text', 'placeholderMobile', 'placeholder'],
    data() {
        return {
            SearchGlass,
            CancelBtn,
            isSearching: false,
            searchText: this.text,
        };
    },
    computed: {
        isMobile() {
            return !this.$mq ? false : this.$mq == 'sm' ? true : false
        },
        placeholderComputed() {
            if (this.placeholderMobile) {
                return this.isMobile ? this.placeholderMobile : this.placeholder
            }
            return this.placeholder
        }
    },
    watch: {
        searchText(val) {
            this.$emit('input', val);
        }
    },
    methods: {
        startSearching() {
            document.querySelector('#app').classList.add('is-app-searching')

            this.isSearching = true;
            this.$parent.$emit('isSearching', true)
            this.addOutsideClickHandlers()
        },
        stopSearching() {
            document.querySelector('#app').classList.remove('is-app-searching')
            document.querySelector('.search-control').blur()

            this.isSearching = false;
            this.$parent.$emit('isSearching', false)
            this.removeOutsideClickHandlers()
        },
        onOutsideClickHandler(e) {
            let cancelBtn = document.querySelector('.search-cancel');
            let control = document.querySelector('.search-control-wrapper');

            if (cancelBtn) {
                if (!control.contains(e.target) && !cancelBtn.contains(e.target)) {
                    this.stopSearching();
                }
            } else {
                if (!control.contains(e.target)) {
                    this.stopSearching();
                }
            }

        },
        addOutsideClickHandlers() {
            document.addEventListener('touchstart', this.onOutsideClickHandler);
            document.addEventListener('click', this.onOutsideClickHandler);
        },
        removeOutsideClickHandlers() {
            document.removeEventListener('touchstart', this.onOutsideClickHandler);
            document.removeEventListener('click', this.onOutsideClickHandler);
        }
    }
};
</script>
<style lang="scss">
.search-overlay {
    height: 100%;
    width: 100%;
    z-index: 2000;
    background: rgba(0, 0, 0, 0.3);
    position: fixed;
    top: 0;
    left: 0;
}

.search-control-wrapper {
    position: relative;
    &::before {
        content: '';
        display: block;
        position: absolute;
        top: 12px;
        left: 15px;
        z-index: 1;
        width: 20px;
        height: 20px;
        background-image: url('/assets/find.svg');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 50% 50%;
    }
}

.search-cancel {
    position: absolute;
    top: 14px;
    right: 22px;
    z-index: 2100;
    width: 12px;
    height: 12px;
    cursor: pointer;
    & svg {
        fill: #EB5757;
        width: 12px;
        height: 12px;
    }
}

.search-control {
    padding-left: 46px;
    position: relative;
    &::-webkit-input-placeholder {
        color: lighten(#576077, 20%);
    }
    &::-moz-placeholder {
        color: lighten(#576077, 20%);
    }
    &:-moz-placeholder {
        color: lighten(#576077, 20%);
    }
    &:-ms-input-placeholder {
        color: lighten(#576077, 20%);
    }
}

.is-app-searching {
    max-height: 100vh;
    overflow: hidden;
}

.is-control-wrapper-searching {
    z-index: 2100;

    &::before {
        z-index: 2100;
    }
}
</style>