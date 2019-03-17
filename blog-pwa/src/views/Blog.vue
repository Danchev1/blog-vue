<template>
  <main class="blog" :class="{ 'blog--reading': this.post }">
    <Header />
    <h1>This is the blog feed</h1>
    <Footer />
  </main>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";

export default {
  name: "Blog",
  props: {
    post: {
      type: String
    },
    author: {
      type: String
    }
  },
  data() {
    return {
      navs: 0,
      title: "",
      labels: {
        post: "",
        author: ""
      }
    };
  },
  components: {
    Footer,
    Header
  }
};
</script>
