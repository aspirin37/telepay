import { _r, _e, genRes } from './_utils';

const notifyRes = genRes('notification', ['GET', 'POST', 'DELETE']);

export default {
  list: (params) => notifyRes('list').get(params).then(_r).catch(_e),
  //markAsRead: ({ notificationId }) => notifyRes(`${notificationId}/read`).get({ notificationId }).then(_r).catch(_e),
};
