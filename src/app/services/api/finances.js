import { _r, _e, genRes } from './_utils';

const transactionsRes = genRes('transaction', ['GET']);
const paymentsRes = genRes('payments', ['GET']);

export default {
    getTransactions: (params) => transactionsRes('list').get(params).then(_r).catch(_e),
    getForm: (params) => paymentsRes('form').get(params).then(_r).catch(_e),
};
