import { _r, _e, genRes } from './_utils';

const channelRes = genRes('channel', ['GET', 'POST', 'DELETE']);

export default {
    list: (params) => channelRes('list').get(params).then(_r).catch(_e),
    create: (params) => channelRes('create').post(params).then(_r).catch(_e),
    show: ({ channelId }) => channelRes(channelId).get().then(_r).catch(_e),
    delete: ({ channelId }) => channelRes(`${channelId}/delete`).delete({ channelId }).then(_r).catch(_e),
    edit: ({ channelId }) => channelRes(`${channelId}/edit`).get({ channelId }).then(_r).catch(_e),

    getCheapestOffer(channel) {
        if (!channel || !channel.channelOffer || !channel.channelOffer.length) return {};
        return channel.channelOffer.sort((a, b) => a.price - b.price)[0];
    },
    offerTime({ hour, minute } = {}) {
        if (typeof hour === 'undefined' || typeof minute === 'undefined') return '-';
        if (hour < 10) hour = '0' + hour;
        if (minute < 10) minute = '0' + minute;
        return `${hour}:${minute}`;
    },
};