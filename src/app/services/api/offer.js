import {_r, _e, genRes} from './_utils';

const offerRes = genRes('channel', ['GET', 'POST', 'DELETE']);

export default {
  list: (params) => offerRes('offers/list').get(params).then(_r).catch(_e),
  show: ({channelId, offerId}) => offerRes(`${channelId}/offers/${offerId}`).get({channelId, offerId}).then(_r).catch(_e),
  create: (params) => offerRes(`${params.channelId}/offers/create`).post(params).then(_r).catch(_e),
  edit: ({channelId, offerId}) => offerRes(`${channelId}/offers/${offerId}/edit`).post().then(_r).catch(_e),
  delete: ({channelId, offerId}) => offerRes(`${channelId}/offers/${offerId}/delete`).post({channelId, offerId}).then(_r).catch(_e),
};
