import Transactions from '@modules/balance/transactions';
import Withdrawal from '@modules/balance/withdrawal';
import Replenishment from '@modules/balance/replenishment';
import { abstract } from './_utils';
export default {
    path: '/balance',
    name: 'balance',
    component: abstract,
    redirect: '/balance/transactions',
    children: [{
        path: 'transactions',
        name: 'transactions',
        component: Transactions,
    }, {
        path: 'withdrawal',
        name: 'withdrawal',
        component: Withdrawal,
    }, {
        path: 'replenishment',
        name: 'replenishment',
        component: Replenishment,
    }],
};