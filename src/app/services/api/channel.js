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
    timeFrameDates(tf = {}, short) {
        if(!tf || typeof tf.hour === 'undefined' || typeof tf.minute === 'undefined') return '-';
        let hoursAfterTop = tf.hour + tf.inTopHours;
        if(tf.hour < 10) tf.hour = '0' + tf.hour;
        if(tf.minute < 10) tf.minute = '0' + tf.minute;
        return short ? `${tf.hour}:${tf.minute}` : `${tf.hour}:${tf.minute} - ${hoursAfterTop}:${tf.minute}`;
    },
};
