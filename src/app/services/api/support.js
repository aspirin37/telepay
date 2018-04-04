import {_r, genRes} from './_utils';

const supportRes = genRes('support', ['GET', 'POST', 'PUT', 'DELETE']);

export default {
    getList: (params)=>supportRes().get(params).then(_r),
};

