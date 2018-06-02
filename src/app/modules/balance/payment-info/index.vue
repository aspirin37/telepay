<template src="./index.html"></template>
<script>
import { WalletsApi } from '@services/api';
import walletTypes from '@utils/wallet-types';
export default Vue.extend({
    data() {
        return {
            walletTypes,
            wallets: []
        };
    },
    computed: {
        walletTypesOptions() {
            return this.walletTypes.reduce((sum, key, i) => {
                return sum + `<option value="${i}">${key}</option>`
            }, '');
        }
    },
    created() {
        this.getWallets()
    },
    methods: {
        async getWallets() {
            let { items } = await WalletsApi.getList();
            this.wallets = items;
        },
        async addPaymentInfoModal() {
            let swalOut = await swal({
                html: `<select class="form-control my-2" id="paymentInfo_wallet_type"><option value="" hidden>Выберите тип счета</option>${this.walletTypesOptions}</select>
                <input type="text" class="form-control my-2" placeholder="Введите номер карты/кошелька" id="paymentInfo_wallet_number">
                <p class="text-danger">Внимательно проверьте правильность заполнения данных, изменить или удалить их возможно будет только через службу поддержки</p>`,
                showCancelButton: false,
                preConfirm() {
                    return new Promise((resolve, reject) => {
                        let type = document.getElementById('paymentInfo_wallet_type');
                        if (!type || !type.value) {
                            reject('Отсутствует номер кошелька/карты');
                            return;
                        }
                        let number = document.getElementById('paymentInfo_wallet_number');
                        if (!number || !number.value) {
                            reject('Тип кошелька не выбран!');
                            return;
                        }

                        resolve({
                            type: type.value,
                            number: number.value,
                        });

                    })
                },
                confirmButtonText: 'Добавить'
            });

            if (swalOut && !swalOut.dismiss && swalOut.value) {
                await WalletsApi.create({
                    type: +swalOut.value.type,
                    number: swalOut.value.number
                });
                this.getWallets()
            }
        }
    }
});
</script>