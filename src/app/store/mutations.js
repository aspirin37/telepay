export default {
    'SET_USER': (state, payload) => {
        state.user = payload;
    },
    'TOGGLE_LOADING': (state, bool) => {
        state.loading = bool;
    },
    'CHANGE_STATE': function(state, { key, value }) {
        function setKey(object, mutatedKey) {
            let currentKey = mutatedKey || key;

            if (typeof object === 'object') {
                if (currentKey && typeof currentKey === 'string' && !currentKey.includes('.')) {
                    object[currentKey] = value;
                } else if (currentKey.includes('.')) {
                    mutatedKey = currentKey.split('.');
                    let mutatedObject = object[mutatedKey[0]];
                    mutatedKey.shift();
                    mutatedKey = mutatedKey.join('.');
                    setKey(mutatedObject, mutatedKey);
                }
            }
        }
        setKey(state, key);
    }
};