import { _r, _e, genRes } from './_utils';

const postRes = genRes('post/template', ['GET', 'POST', 'DELETE']);

export default {
    list: (params) => postRes('list').get(params).then(_r).catch(_e),
};
