import WebStorage from '@utils/storage';
export default {
    'SAVE_POST': function({ state }, payload) {
        WebStorage.set('savedPost', payload, true);
        state.savedPost = payload;
    },
    'DROP_SAVED_POST': function({ state }) {
        WebStorage.rm('savedPost', true);
        state.savedPost = false;
    },
    'SAVE_SELECTED_CHANNELS': function({ state }, payload) {
        WebStorage.set('selectedChannels', payload, true);
        state.selectedChannels = payload;
    },
    'DROP_SELECTED_CHANNELS': function({ state }) {
        WebStorage.rm('selectedChannels', true);
        state.selectedChannels = [];
    },
    'DROP_STATE': function({ state }) {
        state = {
            user: { balance: {}, email: {} },
            loading: false,
            is_advert: false,
            savedPost: false,
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
    }
};
