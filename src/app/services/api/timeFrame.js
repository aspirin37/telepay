import { _r, _e, genRes } from './_utils';

const timeFrameRes = genRes('timeframe', ['GET', 'POST', 'DELETE']);

export default {
    create: (data) => timeFrameRes('create').post(data).then(_r).catch(_e),
    delete: timeFrameId => timeFrameRes(`remove/${timeFrameId}`).get().then(_r).catch(_e),
};