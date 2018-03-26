import VueResource from 'vue-resource';
Vue.use(VueResource);

// import AdminApi from './admin';
import AuthService from './auth';
import ChannelsApi from './channels';
import UserApi from './user';
import FavsApi from './favs';
import PostsApi from './posts'


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
    // AdminApi,
    AuthService,
    ChannelsApi,
    UserApi,
    FavsApi,
    PostsApi
};