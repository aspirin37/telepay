import Post from '@modules/post';
import PostList from '@modules/post/list';
import PostCreate from '@modules/post/create';

export default {
  path: '/post',
  name: 'post',
  component: Post,
  meta: { auth: true },
  redirect: { name: 'post.list' },
  children: [{
    path: 'list',
    name: 'post.list',
    component: PostList,
    meta: { auth: true }
  },
  {
    path: 'create',
    name: 'post.create',
    component: PostCreate,
    meta: { auth: true }
  }]
}
