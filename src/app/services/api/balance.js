import { _r, _e, genRes } from './_utils';

const transactionsRes = genRes('transaction', ['GET']);

export default {
    getTransactions: (params) => transactionsRes('list').get(params).then(_r).catch(_e),
};