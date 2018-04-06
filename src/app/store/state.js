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
        channel: 'Название канала',
        date: moment().format('MMMM DD'),
        time: '',
    },
    configs: {
        date: {
            dateFormat: 'd.m.Y',
            defaultDate: moment().format('DD.MM.YYYY'),
            minDate: 'today'
        },
        time: {
            enableTime: true,
            noCalendar: true,
            dateFormat: 'H:i',
            time_24hr: true,
        },
    },
};