import { _r, genRes } from './_utils';

const channelListsRes = genRes('lists', ['GET','POST','PUT','DELETE']);

export default {
    getList:(params)=>channelListsRes('list').get(params).then(_r),
    create:(data)=>channelListsRes('create').get(data).then(_r),
    delete:(listId)=>channelListsRes('item/remove').get({listId}).then(_r),
};

