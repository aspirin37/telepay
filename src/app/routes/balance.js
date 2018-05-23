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
            name: 'balance:transactions',
            component: Transactions,
        }, {
            path: 'withdrawal',
            name: 'balance:withdrawal',
            component: Withdrawal,
        },
        //  {
        //     path: 'replenishment',
        //     name: 'balance:replenishment',
        //     component: Replenishment,
        // }
    ],
};
