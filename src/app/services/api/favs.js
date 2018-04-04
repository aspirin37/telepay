import {_r, _e, genRes} from './_utils';

const favsRes = genRes('tg/favorites', ['GET', 'POST', 'DELETE']);


export default {
  add: (channel) => favsRes(`${channel}`).post({channel}).then(_r).catch(_e),
  delete: (channel) => favsRes(`${channel}`).delete({channel}).then(_r).catch(_e),
  getAll: () => favsRes().get().then(_r).catch(_e),
};
