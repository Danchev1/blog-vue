import Vue from 'vue';
import Router from 'vue-router';
import Blog from '@/views/Blog.vue';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'feed',
    component: Blog,
  },
  {
    path: '/by/:author',
    name: 'author',
    props: true,
    component: Blog,
  },
  {
    path: '/read/:author',
    name: 'post',
    props: true,
    component: Blog,
  },
];

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  base: process.env.BASE_URL,
  routes,
});
