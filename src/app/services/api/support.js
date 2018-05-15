import {_r, _e, genRes} from './_utils';

const supportRes = genRes('ticket', ['GET', 'POST']);

export default {
    createTicket: (params) => supportRes('create').post(params).then(_r).catch(_e),
    createMessage: (params) => supportRes('message/create').post(params).then(_r).catch(_e),
    // getList: (params)=>supportRes().get(params).then(_r).catch(_e),
};

