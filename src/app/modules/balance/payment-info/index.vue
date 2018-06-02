<template src="./index.html"></template>
<script>
import { BalanceApi } from '@services/api';
export default Vue.extend({
    data() {
        return {
            walletTypes: {
                'wmr': 'Webmoney',
                'qiwi': 'Qiwi',
                'card': 'Банковская карта',
            },
            wallets: []
        };
    },
    computed: {
        walletTypesOptions() {
            return Object.keys(this.walletTypes).reduce((sum, key) => {
                return sum + `<option value="${key}">${this.walletTypes[key]}</option>`
            }, '');
        }
    },
    created() {
        this.getWallets()
    },
    methods: {
        getWallets() {
            //    BalanceApi.getWallets()
            this.wallets = [{
                type: 'wmr',
                number: '138216786326',
                createdAt: new Date(),
            }, {
                type: 'qiwi',
                number: '91322386326',
                createdAt: new Date(),
            }, {
                type: 'card',
                number: '1382 1678 6326 2224',
                createdAt: new Date(),
            }, ]
        },
        addPaymentInfoModal() {
            swal({
                title: '',
                html: `<input type="text" class="form-control my-2" placeholder="Введите номер карты/кошелька" id="paymentInfo_number">
                <select class="form-control my-2" id="paymentInfo_wallet_type"><option value="">Выберите тип кошелька</option>${this.walletTypesOptions}</select><p>Внимательно проверьте правильность заполнения данных, изменить их возможно будет только через службу поддержки</p>`,
                showCancelButton: false,
                confirmButtonText: 'Добавить'
            })
        }
    }
});
</script>