export default {
    getUsername: (state, getters) => {
        if(state.user && state.user.email) {
            return state.user.name || state.user.email.address;
        }
    },
    getLoading: (state) => state.loading,
    isAuthorized: (state) => state.user && state.user.userId,
    getUserBalance: (state) => state.user.balance,
};
