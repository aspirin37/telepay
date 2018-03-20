import { _r, _e, genRes } from './_utils';

const postRes = genRes('post', ['GET', 'POST', 'DELETE']);


export default {
  add: (params) => postRes('create').post(params).then(_r).catch(_e),
  list: (params) => postRes('list').get(params).then(_r).catch(_e)
};
