import { _r, _e, genRes } from './_utils';

const categoryRes = genRes('category', ['GET', 'POST', 'DELETE']);

export default {
  list: (params) => categoryRes('list').get(params).then(_r).catch(_e)
};
