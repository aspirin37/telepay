import Transactions from '@modules/finances/transactions';
import Withdrawal from '@modules/finances/withdrawal';
import PaymentInfo from '@modules/finances/payment-info';
import { abstract } from './_utils';
export default {
    path: '/finances',
    name: 'finances',
    component: Finances,
    redirect: '/finances/transactions',
    children: [{
        path: 'transactions',
        name: 'finances:transactions',
        component: Transactions,
    }, {
        path: 'withdrawal',
        name: 'finances:withdrawal',
        component: Withdrawal,
    }, {
        path: 'payment-info',
        name: 'finances:payment-info',
        component: PaymentInfo,
    }],
};
