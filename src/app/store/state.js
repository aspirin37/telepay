import WebStorage from '@utils/storage';
export default {
    user: { balance: {}, email: {} },
    isMenuOpened: false,
    loading: false,
    is_advert: WebStorage.get( 'is_advert' ),
    savedPost: ( WebStorage.get( 'savedPost', true ) || {
        text: 'Текст...',
        buttons: [],
        images: [],
        timeFrameId: [],
        postTemplateId: '',
        channel: 'Название канала',
        publishAt: null
    } ),
    selectedChannels: WebStorage.get( 'selectedChannels', true ) || [],
    configs: {
        date: {
            dateFormat: 'd.m.Y',
            defaultDate: moment().format( 'DD.MM.YYYY' ),
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
