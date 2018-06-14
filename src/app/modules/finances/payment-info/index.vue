<template src="./index.html"></template>
<script>
import { WalletsApi } from '@services/api';
import walletTypes from '@utils/wallet-types';
import Plus from '@assets/plus.svg';
import Info from '@assets/informations-01.svg';
import searchInput from '@components/search-input';
import maskedInput from 'vue-masked-input';
import addWalletTemplate from './add-wallet-popup.html';

export default Vue.extend({
    data() {
        return {
            Plus,
            Info,
            walletTypes,
            wallets: []
        };
    },
    created() {
        this.getWallets()
    },
    methods: {
        getPopupVue() {
            return new Vue({
                components: { searchInput, maskedInput },
                data: {
                    newWallet: {
                        type: '',
                        number: ''
                    },
                    qiwiValue: '',
                    creditCardValue: '',
                    walletTypes
                },
                computed: {
                    numberMaxlength() {
                        switch (this.newWallet.type.key) {
                            case 'wmr':
                                return 13;
                            case 'yandex-money':
                                return 14;
                            case 'credit-card':
                                return 16;
                            case 'qiwi':
                                return 11;
                            default:
                                return 255
                        }
                    }
                },
                watch: {
                    'creditCardValue': function(val) {
                        if (val && this.newWallet.type && this.newWallet.type.key === 'credit-card') {
                            this.newWallet.number = val
                        }
                    },
                    'qiwiValue': function(val) {
                        if (val && this.newWallet.type && this.newWallet.type.key === 'qiwi') {
                            this.newWallet.number = val
                        }
                    },
                    'newWallet.type': function(w) {
                        this.newWallet.number = '';
                    },
                    newWallet: {
                        deep: true,
                        handler(w) {
                            let walletKey = w && w.type && w.type.key
                            if (walletKey === 'wmr') {
                                if (w.number[0] !== 'R') {
                                    this.newWallet.number = 'R' + w.number.replace(/[^\d]/g, '')
                                } else if (/[^\d]/.test(w.number.slice(1))) {
                                    this.newWallet.number = w.number.replace(/[^\d]/g, '')
                                }
                            }
                        }
                    }
                },
                methods: {

                    createWallet: this.createWallet
                },
                template: addWalletTemplate
            })
        },
        async getWallets() {
            let { items } = await WalletsApi.getList();
            this.wallets = items;
        },
        async addPaymentInfoModal() {
            let currentPopup = this.getPopupVue();
            let swalOut = await swal({
                html: '<div id="modal-mounter"></div>',
                onOpen() {
                    currentPopup.$mount('#modal-mounter');
                },
                onClose() {
                    currentPopup.$destroy();
                },
                showCancelButton: false,
                showConfirmButton: false,
            });
        },

        async editingPopup(wallet) {
            let swalOut = await swal({
                text: 'Изменение платежных данных возможно только через службу поддержки',
                showCancelButton: false,
                confirmButtonClass: 'btn btn-primary',
                confirmButtonText: 'Написать обращение',
            });

            if (swalOut && !swalOut.dismiss) {
                this.$router.push({
                    name: 'support:chat',
                    params: {
                        text: `Здравствуйте, я хочу изменить свои платежные данные. Счет: ${walletTypes[wallet.type].label} ${wallet.number}`,
                        topic: 7
                    }
                })
            }
        },
        async createWallet(wallet) {
            let walletType = this.walletTypes.findIndex(w => w.key === wallet.type.key)
            await WalletsApi.create({
                type: walletType,
                number: wallet.number
            });
            await this.getWallets()
            let swalOut = await swal({
                title: 'Платежные данные добавлены',
                confirmButtonClass: 'btn btn-primary',
                confirmButtonText: 'Добавить ещё',
                padding: 30,
                showCancelButton: false,
            });
            if (swalOut && !swalOut.dismiss) {
                this.addPaymentInfoModal()
            }
        }
    }
});
</script>
<style>
.payment-icon {
    max-width: 100%;
}

.info-icon svg {
    height: 30px;
}

.info-icon path.cls-1 {
    fill: #50BCED !important;
}

.plus-icon svg {
    height: 35px;
    fill: currentColor;
}
</style>