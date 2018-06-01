import Transactions from '@modules/balance/transactions';
import Withdrawal from '@modules/balance/withdrawal';
import PaymentInfo from '@modules/balance/payment-info';
import { abstract } from './_utils';
export default {
    path: '/balance',
    name: 'balance',
    component: abstract,
    redirect: '/balance/transactions',
    children: [{
        path: 'transactions',
        name: 'balance:transactions',
        component: Transactions,
    }, {
        path: 'withdrawal',
        name: 'balance:withdrawal',
        component: Withdrawal,
    }, {
        path: 'payment-info',
        name: 'balance:payment-info',
        component: PaymentInfo,
    }],
};
