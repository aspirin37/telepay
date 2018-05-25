export default {
    getUsername: ( state ) => {
        if ( state.user && state.user.email ) {
            return state.user.name || state.user.email.address;
        }
    },
    getMenuState: ( state ) => state.isMenuOpened,
    getLoading: ( state ) => state.loading,
    isAuthorized: ( state ) => state.user && state.user.userId,
    getUserBalance: ( state ) => state.user.balance,
};
