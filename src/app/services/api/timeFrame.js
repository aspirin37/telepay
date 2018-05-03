import {_r, _e, genRes} from './_utils';

const timeFrameRes = genRes('channel', ['GET', 'POST', 'DELETE']);

export default {
  list: (params) => timeFrameRes('timeFrames/list').get(params).then(_r).catch(_e),
  show: ({channelId, timeFrameId}) => timeFrameRes(`${channelId}/timeFrames/${timeFrameId}`).get({channelId, timeFrameId}).then(_r).catch(_e),
  create: (params) => timeFrameRes(`${params.channelId}/timeFrames/create`).post(params).then(_r).catch(_e),
  edit: ({channelId, timeFrameId}) => timeFrameRes(`${channelId}/timeFrames/${timeFrameId}/edit`).post().then(_r).catch(_e),
  delete: ({channelId, timeFrameId}) => timeFrameRes(`${channelId}/timeFrames/${timeFrameId}/delete`).post({channelId, timeFrameId}).then(_r).catch(_e),
};
