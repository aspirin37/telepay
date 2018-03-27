import VueResource from 'vue-resource';
Vue.use(VueResource);

import ChannelApi from './channel';
import PostApi from './post';
import CatalogApi from './catalog';


import AuthService from './auth';
import UserApi from './user';
import FavsApi from './favs';

let API_BASE;
let protocol = (document.location && document.location.protocol) || 'http:';

switch (process.env.url) {
    case 'loc':
        API_BASE = `${protocol}//0.0.0.0:8080`;
        break;
    case 'dev':
        API_BASE = `${protocol}//dev.api.telepay.io`;
        break;
    default:
        API_BASE = `${protocol}//api.telepay.io`;
        break;
}

Vue.http.options = {
    root: API_BASE
};

export {
    AuthService,
    ChannelApi,
    CatalogApi,
    UserApi,
    FavsApi,
    PostApi
};