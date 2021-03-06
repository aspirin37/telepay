import { FinancesApi } from '@services/api';

export default {
    data() {
        return {
            paymentModal: {
                AUTO_DISMISS_SECONDS: 30,
                randomId: null,
                hasSuccess: false,
                closeTimeout: {
                    timeout: null,
                    interval: null,
                }
            }
        };
    },
    methods: {
        messageListener() {
            if(event.origin !== 'https://api.paymentwall.com') return;
            let parsedData = JSON.parse(event.data);
            let info = document.getElementById(`payment-modal-info-${this.paymentModal.randomId}`);
            switch(parsedData.event) {
                case 'widgetLoaded':
                    swal.hideLoading();
                    if(info) info.innerText = 'Выберите способ платежа';
                    break;
                case 'paymentSuccess':
                    swal.hideLoading();
                    this.paymentModal.hasSuccess = true;
                    if(info) info.innerText =
                    `Транзакция прошла успешно!\n Это окно закроется автоматически через ${this.paymentModal.AUTO_DISMISS_SECONDS} с`;

                    this.paymentModal.closeTimeout.interval = setInterval(() => {
                        this.paymentModal.closeTimeout.counter--;
                        if(info) info.innerText =
                        `Транзакция прошла успешно!\n Это окно закроется автоматически через ${this.paymentModal.closeTimeout.counter} с`;
                        if(this.paymentModal.closeTimeout.counter <= 0) clearInterval(this.paymentModal.closeTimeout.interval);
                    }, 1e3);

                    this.paymentModal.closeTimeout.timeout = setTimeout(() => {
                        swal.clickConfirm();
                        clearInterval(this.paymentModal.closeTimeout.interval);
                        this.paymentModal.closeTimeout.counter = this.paymentModal.AUTO_DISMISS_SECONDS;
                    }, this.paymentModal.AUTO_DISMISS_SECONDS * 1e3);

                    break;
                case 'paymentProcessingStart':
                    if(info) info.innerText = 'Обработка транзакции, ожидайте завершения...';
                    swal.showLoading();
                    break;

                default:
                    break;
            }
        },
        async openPaymentModal(amount, callback) {
            this.paymentModal.hasSuccess = false;
            this.paymentModal.closeTimeout.counter = this.paymentModal.AUTO_DISMISS_SECONDS;
            if(this.$store.state.user && this.$store.state.user.balance && this.$store.state.user.balance.current > 0) {
                amount = amount - this.$store.state.user.balance.current / 100;
            }

            let link = await FinancesApi.getForm({ amount: Math.ceil(amount) });
            this.paymentModal.randomId = Math.round(Math.random() * 1e6);
            let self = this;
            let swalOut = await swal({
                html: `<iframe 
                src="${decodeURIComponent(link)}"
                frameborder="0" width="100%" height="500"></iframe><h3 id="payment-modal-info-${self.paymentModal.randomId}">Загрузка...</h3>`,
                width: '80%',
                padding: 30,
                onOpen() {
                    window.addEventListener('message', self.messageListener, false);
                    swal.showLoading();
                },
                onClose() {
                    window.removeEventListener('message', self.messageListener);
                    clearTimeout(self.paymentModal.closeTimeout.timeout);
                    clearInterval(self.paymentModal.closeTimeout.interval);
                    self.paymentModal.closeTimeout.counter = self.paymentModal.AUTO_DISMISS_SECONDS;
                },
                showCloseButton: true,
                showConfirmButton: false,
                showCancelButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
            });

            if(swalOut && this.paymentModal.hasSuccess) {
                callback();
                this.paymentModal.hasSuccess = false;
            }
        }
    }
};
