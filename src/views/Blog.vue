<template>
  <main class="blog" :class="{ 'blog--reading': this.post }">
    <header>
      <Navigation
        :content="content"
        :filters="filters"
        :navs="navs"
      />
    </header>
    <NewsFeed :filters="filters" />
    <BlogPost v-if="post" :post="post" />
    <Footer></Footer>
  </main>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import Footer from '@/components/Footer.vue';
import NewsFeed from '@/components/NewsFeed.vue';
import BlogPost from '@/components/BlogPost.vue';

export default {
  name: 'Blog',
  components: {
    BlogPost,
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
        title: 'Social Needs',
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
      if (this.author) filters.author = this.author;

      return filters;
    },
  },
  watch: {
    '$route.name': function (to, from) {
      if (to !== from) this.navs += this.navs;
    },
  },
};
</script>
