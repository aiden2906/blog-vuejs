import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/view/Home.vue';
import Blog from '../components/view/Blog.vue';
import Blog_Detail from '../components/view/Blog-Detail.vue';
Vue.use(VueRouter);
export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/tags/:id', component: Blog, name: 'Blog By Tag' },
    { path: '/:id', component: Blog_Detail, name: 'Blog Detail' },
    { path: '/', component: Blog, name: 'Blog' },
    // { path: '/blog', component: Blog, name: 'Blog' },
  ],
});
