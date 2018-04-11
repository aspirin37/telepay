import { _r, _e, genRes } from './_utils';

const postRes = genRes('post', ['GET', 'POST', 'DELETE']);

export default {
    list: (params) => postRes('list').get(params).then(_r).catch(_e),
    create: (params) => postRes('create').post(params).then(_r).catch(_e),
    update: (postId, data) => postRes(`${postId}/edit`).post({ postId }, data).then(_r).catch(_e),
    updateStatus: (postId, data) => postRes(`${postId}/status`).post({ postId }, data).then(_r).catch(_e),
    delete: postId => postRes(`${postId}/delete`).delete({ postId }).then(_r).catch(_e),
};