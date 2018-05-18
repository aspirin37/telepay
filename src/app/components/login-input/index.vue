<template>
    <div class="input-group">
        <div class="input-group-prepend"
             :class="{show:ddOpened}">
            <button type="button"
                    class="btn btn-light dropdown-toggle"
                    @click.prevent="toggleDropdown(true)"
                    @blur="toggleDropdown(false)">
                {{isTel ? 'Телефон' : 'Email'}}
            </button>
            <div class="dropdown-menu"
                 :class="{show:ddOpened}">
                <button class="dropdown-item"
                        @mousedown="setType(0)"
                        @click.prevent="">
                    <i class="fa fa-at"></i> Email</button>
                <button class="dropdown-item"
                        @mousedown="setType(1)"
                        @click.prevent="">
                    <i class="fa fa-phone"></i> Телефон</button>
            </div>
        </div>
        <input type="email"
               placeholder="example@mailer.io"
               v-if="!isTel"
               ref="emailLogin"
               @input="updateValue"
               class="form-control form-control-lg"
               v-model="email">
        <masked-input placeholder="+7 (987) 654-32-10"
                      v-if="isTel"
                      @input="updateValue"
                      v-model="phone"
                      ref="phoneLogin"
                      class="form-control form-control-lg"
                      mask="\+\7 (111) 111-11-11" />
    </div>
</template>
<script>
import maskedInput from 'vue-masked-input';
import WebStorage from '@utils/storage';

export default {
    name: 'login-input',
    components: { maskedInput },
    data() {
        return {
            phone: '',
            email: '',
            isTel: WebStorage.get('isTelLogin'),
            ddOpened: false
        };
    },
    props: ['value'],
    created() {
        if (this.value && /^\+\d+$/.test(this.value)) {
            this.phone = this.value.replace(/^\+7/, '');
        } else {
            this.email = this.value;
        }
    },
    methods: {
        updateValue() {
            let modelVal = this.isTel ? this.phone.replace(/[^\d|\+]/g, '') : this.email;
            this.$emit('input', modelVal);
        },
        toggleDropdown(bool) {
            setTimeout(() => {
                this.ddOpened = bool;
            }, 100);
        },
        setType(bool) {
            if (bool) this.phone = this.phone.replace(/^\+7/, '');
            this.isTel = bool;
            WebStorage.set('isTelLogin', bool);
            this.updateValue();
        }
    }
};
</script>