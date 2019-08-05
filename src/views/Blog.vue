<template>
  <main class="blog" :class="{ 'blog--reading': this.post }">
    <header>
      <Navigation
        :content="content"
        :filters="filters"
        :navs="navs"
      />
    </header>
    <NewsFeed />
    <Footer></Footer>
  </main>
</template>

<script>
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
      headerContent: {
        title: 'Blog',
        labels: {
          post: 'Exit reading mode',
          source: 'View all sources',
        },
      },
    };
  },
  computed: {
    content() {
      return {
        title: this.headerContent.title,
        labels: this.headerContent.labels,
      };
    },
    filters() {
      const filters = {};
      if (this.post) filters.post = this.post;
      if (this.source) filters.source = this.source;
      return filters;
    },
  },

};
</script>
