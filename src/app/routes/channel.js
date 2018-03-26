import Channel from '@modules/channel';
import ChannelList from '@modules/channel/list';
import ChannelCreate from '@modules/channel/create';
import ChannelShow from '@modules/channel/show';
import ChannelDelete from '@modules/channel/delete';
import ChannelEdit from '@modules/channel/edit';


export default {
  path: '/channel',
  name: 'channel',
  component: Channel,
  meta: { auth: true },
  redirect: { name: 'channel.list' },
  children: [{
    path: 'create',
    name: 'channel.create',
    component: ChannelCreate,
    meta: { auth: true }
  },
  {
    path: 'list',
    name: 'channel.list',
    component: ChannelList,
    meta: { auth: true }
  },
  {
    path: ':id',
    name: 'channel.show',
    component: ChannelShow,
    meta: { auth: true }
  },
  {
    path: ':id/delete',
    name: 'channel.delete',
    component: ChannelDelete,
    meta: { auth: true }
  },
  {
    path: ':id/edit',
    name: 'channel.edit',
    component: ChannelEdit,
    meta: { auth: true }
  }]
}
