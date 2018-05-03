import List from '@modules/channel-lists/list';
import Create from '@modules/channel-lists/create';
import Update from '@modules/channel-lists/update';

import { abstract, _crud_ } from './_utils';

export default {
    path: '/channel-lists',
    name: 'channel-lists',
    component: abstract,
    redirect: '/channel-lists/list',
    children: _crud_(
        List,
        Create,
        Update,  
        'channel-lists:'
    ),
}
