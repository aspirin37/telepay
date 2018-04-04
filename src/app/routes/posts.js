import List from '@modules/posts/list';
import Create from '@modules/posts/create';
import Update from '@modules/posts/update';

import {_crud_, abstract} from './_utils';

export default {
    path: '/posts',
    name: 'posts',
    component: abstract,
    redirect: {name: 'posts:list'},
    children: _crud_(
        List,
        Create,
        Update,
        'posts:'
    ),
};
