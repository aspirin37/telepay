export default {
  getUsername: (state, getters) => {
    if(state.user && state.user.email && state.user.phone) {
      return state.user.email.address || state.user.phone.number;
    }
  },
  getLoading: (state) => {
    return state.loading;
  }
}
