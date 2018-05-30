<template>
    <label class="control"
           :class="{ 'control_checked': checked,'control_disabled':disabled }"
           :for="randomId"
           @keypress.enter="checked=!checked">
        <input type="checkbox"
               :name="randomId"
               :disabled="disabled"
               class="control__input"
               v-model="checked"
               :id="randomId" />
        <slot>
            <div class="control__indicator">
                <transition name="fade-scale">
                    <span v-show="checked"
                          class="control__indicator-wrap">
                        <svg x="0px"
                             y="0px"
                             viewBox="0 0 342.357 342.357">
                            <polygon points="290.04,33.286 118.861,204.427 52.32,137.907 0,190.226 118.862,309.071 342.357,85.606 " />
                        </svg>
                    </span>
                </transition>
            </div>
        </slot>
        {{ label }}
    </label>
</template>
<script>
export default {
    props: {
        value: Boolean,
        name: {
            type: [String, Number],
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        label: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            checked: this.value
        };
    },
    watch: {
        value(val) {
            this.checked = val;
        },
        checked() {
            this.handleChange()
        }
    },
    computed: {
        inGroup() {
            return this.$parent.$options.name === 'checkbox-group';
        },
        randomId() {
            return 'checkbox-' + (Math.random() * 1e8).toFixed();
        }
    },
    methods: {
        handleChange() {
            if (!this.inGroup) {
                this.$emit('input', this.checked);
                this.$emit('change', this.checked);
            } else {
                this.$parent.$emit('child-change', this.name);
            }
        }
    }
};
</script>
<style scoped>
.control {
    position: relative;
    cursor: pointer;
    height: 20px;
    width: 20px;
    margin: 0;
}

.control_disabled {
    background-color: #eee;
    cursor: not-allowed;
}

.control__input {
    display: none;
}

.control__indicator {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid rgb(206, 212, 218);
    height: 100%;
    width: 100%;
    border-radius: 4px;
    background-color: transparent;
}

.control__indicator-wrap {
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    align-items: center;
    padding: 4px;
    border-radius: 4px;
    background-color: #ffc000;
}

.control__indicator-wrap svg {
    width: 100%;
    height: 100%;
    fill: #000;
}

.fade-scale-enter-active,
.fade-scale-leave-active {
    transition: 0.2s;
}

.fade-scale-enter,
.fade-scale-leave-to {
    opacity: 0;
    transform: scale(1.5);
}
</style>