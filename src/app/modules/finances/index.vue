<template>
    <div class="container py-3 px-0">
        <h1 class="text-medium-font mb-4">
            Финансы
        </h1>
        <div class="tabs">
            <div class="tabs-row d-flex">
                <div class="pointer tab"
                     :class="tabSelected === 0 ? 'tab--active' : ''"
                     @click="tabSelected = 0">Платежные данные</div>
                <div class="pointer tab"
                     :class="tabSelected === 1 ? 'tab--active' : ''"
                     @click="tabSelected = 1">Операции</div>
                <div class="pointer tab"
                     :class="tabSelected === 2 ? 'tab--active' : ''"
                     @click="tabSelected = 2">История выплат</div>
            </div>
            <transition name="fade-2"
                        mode="out-in">
                <div class="tab-content py-3"
                     key="0"
                     v-if="tabSelected === 0">
                    <payment-info></payment-info>
                </div>
                <div class="tab-content py-3"
                     key="1"
                     v-if="tabSelected === 1">
                    <transactions></transactions>
                </div>
                <div class="tab-content py-3"
                     key="2"
                     v-if="tabSelected === 2">
                    <withdrawal></withdrawal>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
import paymentInfo from './payment-info';
import transactions from './transactions';
import withdrawal from './withdrawal';
export default {
    components: { paymentInfo, transactions, withdrawal },
    data() {
        return {
            tabSelected: 0,
        }
    },
    created() {},
    methods: {

    }

}
</script>