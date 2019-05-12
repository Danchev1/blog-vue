<template>
  <main class="blog" :class="{ 'blog--reading': this.post }">
    <header>
      <Navigation :content="content" :filters="filters" :navs="navs" />
    </header>
    <NewsFeed />
    <Footer></Footer>
  </main>
</template>

<script>
import blogMock from '@/mockData/blog';
/* import newsFeedMock from "@/mockData/feed"; */

import Navigation from '@/components/Navigation.vue';
import Footer from '@/components/Footer.vue';
import NewsFeed from '@/components/NewsFeed.vue';

export default {
  name: 'Blog',
  components: {
    NewsFeed,
    Navigation,
    Footer,
  },
  props: {
    post: {
      type: String,
    },
    author: {
      type: String,
    },
  },
  data() {
    return {
      navs: 0,
      title: '',
      labels: {
        post: '',
        author: '',
      },
    };
  },
  computed: {
    content() {
      return { title: this.title, labels: this.labels };
    },
    filters() {
      const filters = {};
      if (this.post) filters.post = this.post;
      if (this.author) filters.author = this.author;
      return filters;
    },
  },
  created() {
    this.title = blogMock[0].title;
    this.labels.post = blogMock[0].post_label;
    this.labels.author = blogMock[0].author_label;
  },
};
</script>
