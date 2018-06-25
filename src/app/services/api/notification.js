import { _r, _e, genRes } from './_utils';

const notifyRes = genRes('notification', ['GET', 'POST', 'DELETE']);

export default {
    list: (params) => notifyRes('list').get(params).then(_r).catch(_e),
    markAsRead: ({ notificationId }) => notifyRes(`${notificationId}/read`).post({ notificationId }).then(_r).catch(_e),
    markAllAsRead: () => notifyRes('all/read').get().then(_r).catch(_e),
};
