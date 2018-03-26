import { _r, _e, genRes } from './_utils';

const channelsRes = genRes('channel', ['GET', 'POST', 'DELETE']);


export default {
    getList: params => channelsRes('list').get(params).then(_r).catch(_e),
    getById: id => channelsRes(':id', id).get({ id }).then(_r).catch(_e),
    create: data => channelsRes('create').post(params).then(_r).catch(_e),
    update: (data, id) => channelsRes(':id/edit').post(params).then(_r).catch(_e),
    delete: id => channelsRes(':id/delete').delete(params).then(_r).catch(_e),
};