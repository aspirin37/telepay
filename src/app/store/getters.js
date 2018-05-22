export default {
    getUsername: (state, getters) => {
        if (state.user && state.user.email) {
            return state.user.name || state.user.email.address;
        }
    },
    getLoading: (state) => state.loading,
    hasUser: (state) => !!state.user,
    getUserBalance: (state) => state.user.balance,
};