<template src="./index.html"></template>
<script>
import popupTemplate from './popup.html';
import searchInput from '@components/search-input';
import walletTypes from '@utils/wallet-types';
import { clone } from '@utils/clone';
import { WithdrawalsApi } from '@services/api';
import { WalletsApi } from '@services/api';
export default Vue.extend({
    components: { searchInput },
    data() {
        return {
            walletTypes,
            withdrawalStatuses: [
                'Обрабатывается',
                'Выплачено',
                'Отклонено'
            ],
            newWithdrawal: {},
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
        },
        commissionPrice() {
            if (this.newWithdrawal && this.newWithdrawal.wallet && this.newWithdrawal.wallet.type) {
                return walletTypes[this.newWithdrawal.wallet.type].commission * this.newWithdrawal.amount
            }
            return '';
        },
    },
    methods: {
        popupVue() {
            let self = this;
            return new Vue({
                components: { searchInput },
                data: {
                    withdrawal: {
                        amount: 1,
                        walletId: self.wallets.length === 1 ? self.wallets[0].walletId : ''
                    },
                    walletTypes,
                    wallets: self.wallets,
                    commissionPercent: 0,
                },
                computed: {
                    commissionPrice() {
                        if (this.withdrawal.wallet && this.withdrawal.wallet.type) {
                            return walletTypes[this.withdrawal.wallet.type].commission * this.withdrawal.amount
                        }
                        return null;
                    }
                },
                methods: {
                    createWithdrawal: self.createWithdrawal
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
                this.$router.push({ name: 'finances' });
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

        },
        async createWithdrawal(wd) {
            let copy = clone(wd);
            copy.amount *= 100;
            let commissionPercent = walletTypes[copy.wallet.type].commission;

            await WithdrawalsApi.create({
                amount: copy.amount,
                amountWithCommission: copy.amount - (copy.amount * commissionPercent),
                walletId: copy.wallet.walletId
            });

            this.$store.commit('CHANGE_STATE', { key: 'user.balance.current', value: this.user.balance.current - copy.amount })

            swal.close()
            this.newWithdrawal = { amount: null, wallet: null }
            this.getList();
        }
    }
});
</script>