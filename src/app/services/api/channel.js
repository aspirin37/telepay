import { _r, _e, genRes } from './_utils';

const channelRes = genRes('channel', ['GET', 'POST', 'DELETE']);

export default {
  list: (params) => channelRes('list').get(params).then(_r).catch(_e),
  create: (params) => channelRes('create').post(params).then(_r).catch(_e),
  show: ({ channelId }) => channelRes(channelId).get({ channelId }).then(_r).catch(_e),
  delete: ({ channelId }) => channelRes(`${channelId}/delete`).delete({ channelId }).then(_r).catch(_e),
  edit: ({ channelId }) => channelRes(`${channelId}/edit`).get({ channelId }).then(_r).catch(_e),

  showOffer: ({ channelId, offerId }) => channelRes(`${channelId}/offers/${offerId}`).get({ channelId, offerId }).then(_r).catch(_e),
  createOffer: ({ channelId }) => channelRes(`${channelId}/offers/create`).post().then(_r).catch(_e),
  editOffer: ({ channelId, offerId }) => channelRes(`${channelId}/offers/${offerId}/edit`).post().then(_r).catch(_e),
  deleteOffer: ({ channelId, offerId }) => channelRes(`${channelId}/offers/${offerId}/delete`).post().then(_r).catch(_e)
};
