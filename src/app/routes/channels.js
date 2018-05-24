import List from '@modules/channels/list';
import Create from '@modules/channels/create';
import Update from '@modules/channels/update';
import Show from '@modules/channels/show';

import { _crud_, abstract } from './_utils';

export default {
    path: '/channels',
    name: 'channels',
    component: abstract,
    redirect: { name: 'channels:list' },
    children: [..._crud_(
        List,
        Create,
        Update,
        'channels:',
        false,
        'username'
    ), {
        path: 'show/:username',
        name: 'channels:show',
        component: Show,
    }],
};
