export default {
    getUsername: (state, getters) => {
        if (state.user && state.user.email) {
            return state.user.email.address;
        }
    },
    getLoading: (state) => state.loading,
    hasUser: (state) => state.user !== null,
    getUserBalance: (state) => state.user.balance,
};