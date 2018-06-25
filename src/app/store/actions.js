import WebStorage from '@utils/storage';
export default {
    'SAVE_POST': function ({ commit }, payload) {
        WebStorage.set('savedPost', payload, true);
        commit('CHANGE_STATE', { key: 'savedPost', value: payload });
    },
    'DROP_SAVED_POST': function ({ commit }) {
        WebStorage.rm('savedPost', true);
        commit('CHANGE_STATE', {
            key: 'savedPost',
            value: {
                text: '',
                buttons: [],
                images: [],
                timeFrameId: [],
                postTemplateId: '',
                channel: 'Название канала',
                publishAt: null
            }
        });
    },
    'SAVE_SELECTED_CHANNELS': function ({ commit }, payload) {
        WebStorage.set('selectedChannels', payload, true);
        commit('CHANGE_STATE', { key: 'selectedChannels', value: payload });
    },
    'DROP_SELECTED_CHANNELS': function ({ commit }) {
        WebStorage.rm('selectedChannels', true);
        commit('CHANGE_STATE', { key: 'selectedChannels', value: [] });
    },

};
