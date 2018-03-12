import Channels from '@modules/channels';
import ChannelsList from '@modules/channels/list';
import ChannelsCreate from '@modules/channels/create';


export default {
  path: '/channels',
  name: 'channels',
  component: Channels,
  redirect: { name: 'channels-list' },
  children: [{
    path: 'list',
    name: 'channels-list',
    component: ChannelsList
  },
  {
    path: 'create',
    name: 'channels-create',
    component: ChannelsCreate,
  }]
}
