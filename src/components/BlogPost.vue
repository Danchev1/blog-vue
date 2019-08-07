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
      </footer>
    </article>
  </transition>
</template>

<script>
import Http from '@/api/Http';
import { kebabIt, formatDate } from '@/helpers/helpers';

export default {
  name: 'BlogPost',
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
      ready: false,
    };
  },

  computed: {
    allReady() {
      return this.ready && this.post;
    },
  },

  methods: {
    kebabIt,
    formatDate,
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
      this.content = `<p>${response.data.content.split('\n\n').join('</p><p>')}</p>`;
      this.author = response.data.meta.author;
      this.published = response.data.meta.published;
      this.description = response.data.meta.description;
      this.ready = true;
    });
  },
};
</script>
