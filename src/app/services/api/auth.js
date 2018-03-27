import { _r, _e, genRes } from './_utils';

const authRes = genRes('auth', ['POST']);

export default {
    register: (data) => authRes('register').post(data).then(_r).catch(_e),
    login: (data) => authRes('login').post(data).then(_r).catch(_e),
    logout: () => authRes('logout').get().then(_r).catch(_e)
};
