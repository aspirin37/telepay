import { _r, _e, genRes } from './_utils';

const postRes = genRes('post', ['GET', 'POST', 'DELETE']);


export default {
    list: (params) => postRes('list').get(params).then(_r).catch(_e),
    create: (params) => postRes('create').post(params).then(_r).catch(_e),
    edit: postId => postRes(`${postId}/edit`).post().then(_r).catch(_e),
    delete: postId => postRes(`${postId}/delete`).delete({ postId }).then(_r).catch(_e),
};