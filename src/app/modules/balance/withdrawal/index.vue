<template src="./index.html"></template>
<script>
import popupTemplate from './popup.html';
import normCheckbox from '@components/checkbox';
import walletTypes from '@utils/wallet-types';
import { clone } from '@utils/clone';
import { WithdrawalsApi } from '@services/api';
import { WalletsApi } from '@services/api';
export default Vue.extend({
    data() {
        return {
            walletTypes,
            withdrawalStatuses: [
                'Обрабатывается',
                'Выплачено',
                'Отклонено'
            ],
            withdrawals: [],
            wallets: []
        }
    },
    created() {
        this.getWallets()
        this.getList()
    },
    computed: {
        user() {
            return this.$store.state.user
        }
    },
    methods: {
        popupVue() {
            return new Vue({
                components: { normCheckbox },
                data: {
                    withdrawal: {
                        amount: this.user.balance.current / 100,
                        walletId: ''
                    },
                    walletTypes,
                    wallets: this.wallets,
                    checkedTerms: false,

                },
                methods: {
                    createWithdrawal: this.createWithdrawal
                },
                template: popupTemplate
            })
        },
        async getWallets() {
            let { items } = await WalletsApi.getList();
            this.wallets = items;
        },
        async getList() {
            let { items } = await WithdrawalsApi.getList();
            this.withdrawals = items;
        },
        async openPopup() {
            if (this.user.balance.current < 1e5) {
                this.$notifystr.danger('Ошибка!', 'Сумма на балансе недостаточна для совершения вылаты!');
                return;
            }

            if (this.wallets && !this.wallets.length) {
                this.$notifystr.danger('Ошибка!', 'У вас нет ни одного платежного счета!');
                this.$router.push({ name: 'balance:payment-info' });
                return;
            }

            let currentPopup = this.popupVue();
            let swalOut = await swal({
                html: '<div id="popup-mounter"></div>',
                showCancelButton: false,
                showConfirmButton: false,
                onOpen() {
                    currentPopup.$mount('#popup-mounter')
                },
                onClose() {
                    currentPopup.$destroy()
                }
            });

            this.getList();
        },
        async createWithdrawal(wd) {
            let copy = clone(wd);
            copy.amount *= 100;
            await WithdrawalsApi.create(copy);

            this.$store.commit('CHANGE_STATE', { key: 'user.balance.current', value: this.user.balance.current - copy.amount })

            swal.close()
        }
    }
});
</script>