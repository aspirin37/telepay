<template src="./index.html"></template>
<script>
import { mapState } from 'vuex';
import postList from '@components/post-list';
import { PostApi } from '@services/api';
import WebStorage from '@utils/storage';
export default {
    components: {
        postList
    },
    data() {
        return {
            posts: { in: [],
                out: []
            },
            selected: this.$route.params.tab || 'inbound'
        };
    },
    computed: { ...mapState(['user', 'is_advert'])
    },
    created() {
        this.$root.$on('posts_list:getPosts', this.getPosts);
        this.getPosts();
    },
    methods: {
        async getPosts() {
            this.posts.in = [];
            this.posts.out = [];
            let { items, total } = await PostApi.list({ limit: 1000 });
            items.forEach(postOrder => {
                if (
                    postOrder &&
                    postOrder.timeFrame &&
                    postOrder.timeFrame.channel
                ) this.posts[postOrder.timeFrame.channel.userId === this.user.userId ? 'in' : 'out'].push(postOrder);
            });
            this.posts.in.sort(this._sorter);
            this.posts.out.sort(this._sorter);
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