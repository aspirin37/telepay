<template src="./index.html"></template>
<script>
import normCheckbox from '@components/checkbox';
import { BalanceApi } from '@services/api';
export default Vue.extend({
    components: { normCheckbox },
    data() {
        return {
            amount: 100,
            checkedTerms: false,
            closeTimeout: {
                timeout: null,
                interval: null,
                counter: 30
            }
        };
    },
    created() {

    },
    methods: {
        messageListener() {
            if (event.origin !== 'https://api.paymentwall.com') return;
            console.log(event)
            let parsedData = JSON.parse(event.data);
            let info = document.getElementById(`payment-modal-info-${this.randomId}`);
            switch (parsedData.event) {
                case 'widgetLoaded':
                    swal.hideLoading();
                    if (info) info.innerText = 'Выберите способ платежа';
                    break;
                case 'paymentSuccess':
                    if (info) info.innerText = 'Транзакция прошла успешно! Это окно закроется автоматически через 30 секунд';
                    this.closeTimeout.interval = setInterval(() => {
                        this.closeTimeout.counter--;
                        if (info) info.innerText =
                            `Транзакция прошла успешно! Это окно закроется автоматически через ${this.closeTimeout.counter} секунд`;
                        if (this.closeTimeout.counter <= 0) clearInterval(this.closeTimeout.interval)
                    }, 1000)
                    this.closeTimeout.timeout = setTimeout(() => {
                        swal.close()
                        this.closeTimeout.counter = 30;
                    }, 30000);
                    break;
                case 'paymentProcessingStart':
                    if (info) info.innerText = 'Обработка транзакции, ожидайте завершения...';
                    break;

                default:
                    break;
            }
        },
        async openPaymentModal() {
            let link = await BalanceApi.getForm({ amount: this.amount });
            this.randomId = (Math.random() * 1e6).toFixed();
            let self = this;
            swal({
                html: `<iframe 
                src="${decodeURIComponent(link)}"
                frameborder="0" width="100%" height="500"></iframe><h3 id="payment-modal-info-${this.randomId}">Загрузка...</h3>`,
                width: '80%',
                padding: 30,
                onOpen() {
                    window.addEventListener('message', self.messageListener, false);
                    swal.showLoading()
                },
                onClose() {
                    window.removeEventListener('message', self.messageListener);
                },
                showCloseButton: true,
                showConfirmButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
            })
        }
    }
});
</script>