import { _r, _e, genRes } from './_utils';

const botRes = genRes('bot', ['GET']);

export default {
    getChannelInfo: (username) => botRes('channel-info').get(username).then(_r).catch(_e),
};
