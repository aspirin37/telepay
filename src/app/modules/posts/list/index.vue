<template src="./index.html"></template>
<script>
import { mapState } from 'vuex';
import { PostApi } from '@services/api';
import postList from '@components/post-list';
import WebStorage from '@utils/storage';
import pgn from 'vue-pagination-btns';
export default {
    components: {
        postList
    },
    data() {
        return {
            posts: [],
            selected: this.$route.params.tab || 'inbound'
        };
    },
    mixins: [pgn],
    computed: {
        ...mapState(['user', 'is_advert'])
    },
    created() {
        this.$root.$on('posts_list:getPosts', this.getPosts);
        this.getPosts(this.pgnSets);
    },
    methods: {
        async getPosts(params) {
            params.for = +this.is_advert;
            let { items, total } = await PostApi.list(params);

            this.posts = items.sort(this._sorter);
            this.pgnSets.total = total;
        },
        _sorter(a, b) {
            let now = Math.round(Date.now() / 1e3);
            if (a.publishAt >= now && b.publishAt >= now) {
                return a.publishAt - b.publishAt;
            } else if (a.publishAt >= now) {
                return -1;
            } else if (b.publishAt >= now) {
                return 1;
            } else {
                return b.publishAt - a.publishAt;
            }
        }
    }
};
</script>