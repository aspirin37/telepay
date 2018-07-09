const uuidRegexp = '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}';

export default [
    `notification/${uuidRegexp}/read`,
    'notification/all/read',
    'notification/list',
    `catalog/filter`,
    'catalog/blacklist/remove',
    'catalog/blacklist/add',
    `ticket/${uuidRegexp}`,
    'user$',
    'post/check/time',
    'ticket/message/create',
    'bot/channel-info',
];
