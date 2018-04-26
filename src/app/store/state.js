import LS from '@utils/local-storage';
export default {
    user: { balance: {}, email: {} },
    loading: false,
    is_advert: LS.get('is_advert'),
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