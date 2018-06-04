import VueResource from 'vue-resource';
Vue.use(VueResource);

import ChannelApi from './channel';
import PostApi from './post';
import CatalogApi from './catalog';
import TimeFrameApi from './timeframe';
import NotificationApi from './notification';
import AuthApi from './auth';
import UserApi from './user';
import FinancesApi from './finances';
import PostTemplateApi from './post-templates';
import ChannelListsApi from './channel-lists';
import SupportApi from './support';
import WalletsApi from './wallets';
import WithdrawalsApi from './withdrawals';

let API_BASE;
let protocol = (document.location && document.location.protocol) || 'http:';

switch(process.env.url) {
    case 'loc':
        API_BASE = 'http://0.0.0.0:8080';
        break;
    case 'dev':
        API_BASE = `${protocol}//dev.api.telepay.io`;
        break;
    default:
        API_BASE = `${protocol}//api.telepay.io`;
        break;
}

Vue.http.options = {
    root: API_BASE,
};

export {
    AuthApi,
    TimeFrameApi,
    ChannelApi,
    CatalogApi,
    NotificationApi,
    UserApi,
    ChannelListsApi,
    PostTemplateApi,
    FinancesApi,
    PostApi,
    SupportApi,
    WalletsApi,
    WithdrawalsApi
};
