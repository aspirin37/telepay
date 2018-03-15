import Channels from '@modules/channels';
import ChannelsList from '@modules/channels/list';
import ChannelsCreate from '@modules/channels/create';


export default {
  path: '/channels',
  name: 'channels',
  component: Channels,
  meta: { auth: true },
  redirect: { name: 'channels-list' },
  children: [{
    path: 'list',
    name: 'channels-list',
    component: ChannelsList,
    meta: { auth: true }
  },
  {
    path: 'create',
    name: 'channels-create',
    component: ChannelsCreate,
    meta: { auth: true }
  }]
}
