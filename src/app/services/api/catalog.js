import { _r, _e, genRes } from './_utils';

const catalogRes = genRes('catalog', ['GET', 'POST', 'DELETE']);

export default {
    filter: (params) => catalogRes('filter').get(params).then(_r).catch(_e),
    list: (params) => catalogRes('list').get(params).then(_r).catch(_e),
    all: (params) => catalogRes('all').get(params).then(_r).catch(_e)
};