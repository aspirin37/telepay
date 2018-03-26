import Posts from '@modules/posts';
import PostsList from '@modules/posts/list';
import PostsCreate from '@modules/posts/create';

export default {
    path: '/posts',
    name: 'posts',
    component: Posts,
    meta: { auth: true },
    redirect: { name: 'posts:list' },
    children: [{
            path: 'list',
            name: 'posts:list',
            component: PostsList,
            meta: { auth: true }
  },
        {
            path: 'create',
            name: 'posts:create',
            component: PostsCreate,
            meta: { auth: true }
  }]
}