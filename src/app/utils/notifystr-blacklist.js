const uuidRegexp = '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}';
export default [
    `channel/${uuidRegexp}/edit`,
    `notification/${uuidRegexp}/read`,
    `post/check/time`,
    `ticket/message/create`,
];