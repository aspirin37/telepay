import { _r, _e, genRes } from './_utils';

const channelsRes = genRes('tg/channels', ['GET']);
const singleChannelRes = genRes('tg/single-channel', ['GET']);
const searchRes = genRes('tg/search', ['GET']);


export default {
  getAll: (params) => channelsRes().get(params).then(_r).catch(_e),
  get: (params) => singleChannelRes('{/id}', params.id).get(params).then(_r).catch(_e),
  search: (params) => searchRes().get(params).then(_r).catch(_e)
};
