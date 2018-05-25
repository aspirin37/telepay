export default {
    'SET_USER': ( state, payload ) => {
        state.user = payload;
    },
    'TOGGLE_MENU': ( state, payload ) => {
        state.isMenuOpened = payload;
    },
    'TOGGLE_LOADING': ( state, bool ) => {
        state.loading = bool;
    },
    'CHANGE_STATE': function ( state, { key, value } ) {
        function setKey( object, mutatedKey ) {
            let currentKey = mutatedKey || key;

            if ( typeof object === 'object' ) {
                if ( currentKey && typeof currentKey === 'string' && !currentKey.includes( '.' ) ) {
                    if ( object[ currentKey ] !== value ) object[ currentKey ] = value;
                } else if ( currentKey.includes( '.' ) ) {
                    mutatedKey = currentKey.split( '.' );
                    let mutatedObject = object[ mutatedKey[ 0 ] ];
                    mutatedKey.shift();
                    mutatedKey = mutatedKey.join( '.' );
                    setKey( mutatedObject, mutatedKey );
                }
            }
        }
        setKey( state, key );
    },
    'DROP_STATE': function ( state ) {
        let emptyState = {
            user: { balance: {}, email: {} },
            loading: false,
            is_advert: false,
            savedPost: false,
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

        // нельзя просто так взять и сделать state = emptyState :(
        for ( let key in emptyState ) {
            state[ key ] = emptyState[ key ];
        }
    }
};
