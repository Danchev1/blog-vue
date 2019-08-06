<template>
  <transition name="post">
    <article v-if="allReady" class="post">
      <header class="post__header">
        <h2 class="post__title">{{ title }}</h2>

        <h3 class="post__meta">by
          <router-link
            class="post__author"
            :to="`/by/${kebabIt(author)}`">
            {{ author }}
          </router-link>
          <span class="post__sep"></span>
          <time>{{ formatDate(published) }}</time>
        </h3>

        <blockquote class="post__subtitle">{{ description }}</blockquote>
      </header>

      <section class="post__body rte" v-html="content"></section>

      <footer class="post__footer">
<!--        <VueDisqus-->
<!--          shortname="vue-blog-demo"-->
<!--          :key="post"-->
<!--          :identifier="post"-->
<!--          :url="`https://vue-blog-demo.netlify.com/read/${post}`"-->
<!--        />-->
      </footer>
    </article>
  </transition>
</template>

<script>
// import VueDisqus from 'vue-disqus';
import Http from '@/api/Http';
import { kebabIt, formatDate } from '@/helpers/helpers';

export default {
  name: 'BlogPost',
  // components: { VueDisqus },
  props: {
    post: {
      type: String,
    },
  },

  data() {
    return {
      title: '',
      author: '',
      content: '',
      published: '',
      description: '',
      // commentsReady: false,
      ready: false,
    };
  },

  computed: {
    allReady() {
      return this.ready && this.post;
    },
  },

  // watch: {
  //   post(to, from) {
  //     if (to === from || !this.post) return;
  //
  //     this.commentsReady = false;
  //     this.$getResource('post', to)
  //       .then(this.showComments)
  //       .then(() => {
  //         this.ready = true;
  //       });
  //   },
  // },

  methods: {
    kebabIt,
    formatDate,
    // showComments() {
    // // This is injected by prerender-spa-plugin on build time,
    //  // we don't prerender disqus comments.
    //   if (window.__PRERENDER_INJECTED && window.__PRERENDER_INJECTED.prerendered) return;
    //
    //   setTimeout(() => {
    //     this.commentsReady = true;
    //   }, 1000);
    // },
  },

  mounted() {
    if (!this.post) {
      this.ready = true;
    }

    Http.get('/post', {
      params: {
        id: this.post,
      },
    }).then((response) => {
      console.log(response);
      this.title = response.data.title;
      this.content = response.data.content;
      this.author = response.data.meta.author;
      this.published = response.data.meta.published;
      this.description = response.data.meta.description;
      this.ready = true;
    });
    // this.$getResource('post', this.post)
    //   .then(this.showComments)
    //   .then(() => {
    //     this.ready = true;
    //   });
  },
};
</script>
