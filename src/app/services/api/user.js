import { _r, _e, genRes } from './_utils';
const userRes = genRes('user', ['GET', 'POST', 'PATCH']);
export default {
    getUser: () => userRes().get().then(_r).catch(_e),
    update: (data) => userRes().patch(data).then(_r).catch(_e),

    confirmEmail: (code) => userRes('confirm_email').get({ code }).then(_r).catch(_e),
    requestEmailConfirm: () => userRes('request_email_confirmation').post().then(_r).catch(_e),

    confirmPhone: (data) => userRes('confirm_phone').post(data).then(_r).catch(_e),
    requestPhoneConfirm: () => userRes('request_phone_confirmation').post().then(_r).catch(_e),

    resetPassByMail: (data) => userRes('reset-password').post(data).then(_r).catch(_e),
    resetPassByPhone: (data) => userRes('reset-password-by-phone').post(data).then(_r).catch(_e),
    requestResetPass: (data) => userRes('request_password_reset').post(data).then(_r).catch(_e),
};
