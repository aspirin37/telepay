export default {
  'SET_USER': function(state, payload) {
    state.user = payload;
  },
  'TOGGLE_LOADING': function(state, bool) {
    state.loading = bool
  },
}
