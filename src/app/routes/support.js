import List from '@modules/support/list';
import Chat from '@modules/support/chat';

import { abstract } from './_utils';

export default {
    path: '/support',
    name: 'support',
    component: abstract,
    redirect: { name: 'support:list' },
    children: [{
            path: 'show/:ticketId?',
            name: 'support:chat',
            component: Chat,
        },
        {
            path: 'list',
            name: 'support:list',
            component: List,
        }
    ],
};
