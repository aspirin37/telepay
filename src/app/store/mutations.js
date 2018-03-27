export default {
  'SET_USER': (state, payload) => {
    state.user = payload;
  },
  'TOGGLE_LOADING': (state, bool) => {
    state.loading = bool;
  },
  'UPDATE_POST': (state, payload) => {
    Vue.set(state.post, payload.prop, payload.value);
  }
}
