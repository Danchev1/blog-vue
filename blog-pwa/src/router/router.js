import Vue from "vue";
import Router from "vue-router";
import Blog from "@/views/Blog.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  linkActiveClass: "active",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "feed",
      component: Blog
    },
    {
      path: "/by/:author",
      name: "author",
      props: true,
      component: Blog
    },
    {
      path: "/read/:author",
      name: "post",
      props: true,
      component: Blog
    }
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // }
  ]
});
