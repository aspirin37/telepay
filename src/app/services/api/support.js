import {_r, _e, genRes} from './_utils';

const supportRes = genRes('ticket', ['GET', 'POST']);

export default {
    createTicket: (params) => supportRes('create').post(params).then(_r).catch(_e),
    createMessage: (params) => supportRes('message/create').post(params).then(_r).catch(_e),
    getList: (params) => supportRes('list').get(params).then(_r).catch(_e),
    getStatusList: (params) => supportRes('status/list').get(params).then(_r).catch(_e),
    setRating: (ticketId, rating) => supportRes(`${ticketId}/rate`).post(rating).then(_r).catch(_e),
};

