<template>
    <div class="v-dropdown"
         ref="wrap">
        <div class="v-dropdown__trigger"
             ref="trigger">
            <slot name="trigger"></slot>
        </div>
        <transition name="v-dropdown">
            <div class="v-dropdown__body"
                 :class="classes"
                 v-show="visible">
                <slot name="body"></slot>
            </div>
        </transition>
    </div>
</template>
<script>
// TODO написать нормальный дропдаун вместо этого говнокода
export default {
    props: {
        eventTrigger: {
            type: String,
            default: 'click'
        },
        dropPosition: {
            type: String,
            default: 'center'
        },
    },
    data() {
        return {
            visible: false
        }
    },
    computed: {
        classes() {
            return [
                `v-dropdown__body_${this.dropPosition}`
            ]
        }
    },
    mounted() {
        if (this.eventTrigger === 'click') {
            this.$refs.trigger.addEventListener('click', this.toggle);
        } else if (this.eventTrigger === 'hover') {
            this.$refs.wrap.addEventListener('mouseenter', this.show);
            this.$refs.wrap.addEventListener('mouseleave', this.hide);
        }
        window.addEventListener('click', this.clickOutside);
    },
    beforeDestroy() {
        if (this.eventTrigger === 'click') {
            this.$refs.trigger.removeEventListener('click', this.toggle);
        } else if (this.eventTrigger === 'hover') {
            this.$refs.wrap.removeEventListener('mouseenter', this.show);
            this.$refs.wrap.removeEventListener('mouseleave', this.hide);
        }
        window.removeEventListener('click', this.clickOutside);
    },
    methods: {
        show() {
            this.visible = true;
        },
        hide() {
            setTimeout(() => { this.visible = false }, 100);
        },
        toggle() {
            this.visible = !this.visible;
        },
        clickOutside(e) {
            if (!this.$refs.wrap.contains(e.target)) this.hide();
        }
    }
}
</script>
<style lang="scss">
.v-dropdown {
    position: relative;
    height: 100%;
    &__trigger {
        height: 100%;
        cursor: pointer;
    }
    &__body {
        position: absolute;
        top: 100%;
        min-width: 100%;
        z-index: 100;
        &_center {
            left: 50%;
            transform: translate(-50%, 0px);
        }
        &_left {
            left: 0;
        }
        &_right {
            right: 0;
        }
    }
}

.v-dropdown-enter-active,
.v-dropdown-leave-active {
    transition: .2s ease-in-out;
}

.v-dropdown-enter,
.v-dropdown-leave-to {
    opacity: 0;
    transform: translate(-50%, 20px);
}

.v-dropdown__body {
    /* position: relative; */
    background-color: #fff;
    min-width: 200px;
    box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
}

.v-dropdown__body:before {
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