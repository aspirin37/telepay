export default {
    user: null,
    loading: false,
    post: {
        text: '',
        buttons: [],
        images: [],
        publishAt: '',
        offerId: [],
        postTemplateId: '',
        channel: 'chagram',
        date: '',
        time: '',
    },
    configs: {
        date: {
            dateFormat: 'd.m.Y',
            defaultDate: moment().format('DD.MM.YYYY'),
        },
        time: {
            enableTime: true,
            noCalendar: true,
            dateFormat: 'H:i',
            time_24hr: true,
        },
    },
};