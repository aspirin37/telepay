import List from '@modules/support/list';
import Create from '@modules/support/create';
import Update from '@modules/support/update';

import { _crud_, abstract } from './_utils';

export default {
    path: '/support',
    name: 'support',
    component: abstract,
    redirect: { name: 'support:create' },
    children: _crud_(
        List,
        Create,
        Update,
        'support:'
    ),
};