import {_r, _e, genRes} from './_utils';

const adminRes = genRes('admin', ['GET', 'POST']);
const tgRes = genRes('tg', ['GET']);
export default {
  getCategories: (params) => tgRes('categories').get(params).then(_r).catch(_e),
  getPhones: (params) => adminRes('accounts').get(params).then(_r).catch(_e),
  addPhone: (params) => adminRes('accounts').post(params).then(_r).catch(_e),
  auth: (params) => adminRes('login_code').post(params).then(_r).catch(_e),
  addChannel: (params) => adminRes('channels/add').post(params).then(_r).catch(_e),
  addCategory: (params) => adminRes('category').post(params).then(_r).catch(_e),
  addCategoryToChannel: (params) => adminRes('channels/add-categories').post(params).then(_r).catch(_e),
};
