export default [
    { key: 'wmr', label: 'Webmoney (WMR)', commission: null, min: 3000, max: null, meta: '' },
    // { key: 'wmz', label: 'Webmoney (WMZ)' },
    // { key: 'epayments', label: 'ePayments eWallet', commission: 0.02, min: 100, max: 2000, meta: '' },
    { key: 'yandex-money', label: 'Яндекс Деньги', commission: 0.02, min: 155000, max: 2000, meta: 'не более 75 000 RUB в день; 100 000 RUB в месяц' },
    { key: 'credit-card', label: 'Банковская карта', commission: 0.02, min: 155000, max: 2000, meta: 'не более 75 000 RUB в день; 600 000 RUB в месяц' },
    { key: 'qiwi', label: 'Qiwi Кошелёк', commission: 0.02, min: 100, max: 155000, meta: 'не более 75 000 RUB в день; 100 000 RUB в месяц' },
];
