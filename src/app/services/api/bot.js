import { _r, _e } from './_utils';

let OFFICE_URL;
let protocol = (document.location && document.location.protocol) || 'http:';

switch(process.env.url) {
case 'loc':
    OFFICE_URL = 'http://0.0.0.0:8080';
    break;
case 'dev':
    OFFICE_URL = `${protocol}//dev.telepay.io`;
    break;
default:
    OFFICE_URL = `${protocol}//telepay.io`;
    break;
}

export default {
    getChannelInfo: (username) => Vue.resource(OFFICE_URL + '/bot/channel-info').get({ username }).then(_r).catch(_e),

};
