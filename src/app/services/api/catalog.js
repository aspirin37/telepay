import { _r, _e, genRes } from './_utils';

const catalogRes = genRes('catalog', ['GET', 'POST', 'DELETE']);

export default {
    filter: (params) => catalogRes('filter').get(params).then(_r).catch(_e),
    list: (params) => catalogRes('list').get(params).then(_r).catch(_e),
    all: (params) => catalogRes('all').get(params).then(_r).catch(_e),
    blacklistAdd: data => catalogRes('blacklist/add').post(data).then(_r).catch(_e),
    blacklistRemove: data => catalogRes('blacklist/remove').post(data).then(_r).catch(_e),
    getStats: (params) => catalogRes('filter/edge-stat').get(params).then(_r).catch(_e),
};
