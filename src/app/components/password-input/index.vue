<template>
    <div class="password-input__wrap">
        <input class="password-input__input"
               :type="type"
               :class="classes"
               :readonly="readonly"
               :placeholder="placeholder"
               v-model="innerValue"
               @input="handler">
        <span class="password-input__eye"
              @click="toggle"
              v-if="!readonly">
            <i class="fa text-light-font"
               :class="eyeClass"
               aria-hidden="true"></i>
        </span>
    </div>
</template>
<script>
export default {
    props: {
        value: { default: '' },
        classes: {
            type: String
        },
        placeholder: {
            type: String
        },
        readonly: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            visible: false,
            innerValue: ''
        }
    },
    watch: {
        value(val) {
            this.innerValue = val
        }
    },
    computed: {
        type() {
            return this.visible ? 'text' : 'password';
        },
        eyeClass() {
            return this.visible ? 'fa-eye' : 'fa-eye-slash';
        }
    },
    methods: {
        handler(e) {
            this.$emit('input', this.innerValue);
        },
        toggle() {
            this.visible = !this.visible;
        }
    }
}
</script>
<style lang="scss">
.password-input {
    &__wrap {
        position: relative;
    }
    &__input {
        padding-right: 38px;
    }
    &__eye {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        right: 0;
        top: 0;
        height: 100%;
        width: 38px;
        cursor: pointer;
    }
}
</style>