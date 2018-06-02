import { _r, _e, genRes } from './_utils';

const withdrawalList = genRes('withdrawal', ['GET', 'POST']);

export default {
    getList: (params) => withdrawalList('list').get(params).then(_r).catch(_e),
    create: (data) => withdrawalList('create').post(data).then(_r).catch(_e),
};
