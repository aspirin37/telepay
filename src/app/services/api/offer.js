import { _r, _e, genRes } from './_utils';

const offerRes = genRes(':channelId/offers', ['GET', 'POST', 'DELETE']);

export default {
  show: ({ channelId, offerId }) => offerRes(`${channelId}/offers/${offerId}`).get({ channelId, offerId }).then(_r).catch(_e),
  create: ({ channelId }) => offerRes(`${channelId}/offers/create`).post().then(_r).catch(_e),
  edit: ({ channelId, offerId }) => offerRes(`${channelId}/offers/${offerId}/edit`).post().then(_r).catch(_e),
  delete: ({ channelId, offerId }) => offerRes(`${channelId}/offers/${offerId}/delete`).post().then(_r).catch(_e)
};
