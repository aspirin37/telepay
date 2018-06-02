import { _r, _e, genRes } from './_utils';

const walletList = genRes('wallet', ['GET', 'POST']);

export default {
    getList: (params) => walletList('list').get(params).then(_r).catch(_e),
    create: (data) => walletList('create').post(data).then(_r).catch(_e),
};
