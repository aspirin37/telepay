import { _r, _e, genRes } from './_utils';

const channelRes = genRes('channel', ['GET', 'POST', 'DELETE']);

export default {
    list: (params) => channelRes('list').get(params).then(_r).catch(_e),
    create: (params) => channelRes('create').post(params).then(_r).catch(_e),
    show: ({ channelId }) => channelRes(channelId).get().then(_r).catch(_e),
    delete: ({ channelId }) => channelRes(`${channelId}/delete`).delete({ channelId }).then(_r).catch(_e),
    edit: (channelId, data) => channelRes(`${channelId}/edit`).post(data).then(_r).catch(_e),

    getCheapestTimeFrame(channel) {
        if(!channel || !channel.timeFrame || !channel.timeFrame.length) return {};
        return channel.timeFrame[0];
        // return channel.timeFrame.find( tf => tf.weekDay === moment().weekday() + 1 );
    },
    timeFrameDates({ hour, minute, inTopHours } = {}, short) {
        let hoursAfterTop = hour + inTopHours;
        if(typeof hour === 'undefined' || typeof minute === 'undefined') return '-';
        if(hour < 10) hour = '0' + hour;
        if(minute < 10) minute = '0' + minute;
        return short ? `${hour}:${minute}` : `${hour}:${minute} - ${hoursAfterTop}:${minute}`;
    },
};
