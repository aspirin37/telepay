export default {
  getUsername: (state, getters) => {
    if(state.user && state.user.email) {
      return state.user.email.address;
    }
  },
  getLoading: state => state.loading,
  hasUser: state => state.user !== null,
  getDateConfig: state => state.configs.date,
  getTimeConfig: state => state.configs.time,
  getParsedImages: state => state.post.images.map(img => img.decoded),
  getPostImages: state => state.post.images.map(img => img.file)
}
