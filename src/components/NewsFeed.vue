<template>
  <transition-group tag="ul" :name="transition"  class="blog__feed">
    <li class="preview" v-for="post in feed" :key="post.id">

      <figure class="preview__figure" :style="getBgImage(post.image)">
        <transition name="v--fade">
          <figcaption class="preview__details" v-if="!reading">
            <router-link
             class="preview__title"
             :to="`/read/${post.id}`"
             @click.native="scrollTo(0, 220, 550)"
            >
              {{ post.title }}
            </router-link>
            <div class="preview__meta">
              <time class="preview__published">
                {{ formatDate(post.published) }}
              </time>

              <router-link
                class="preview__author"
                :to="`/by/${kebabIt(post.author)}`"
                @click.native="scrollTo(0, 220, 550)"
              >
                {{ post.author }}
              </router-link>
            </div>
          </figcaption>
        </transition>
      </figure>

    </li>
  </transition-group>
</template>

<script>
import Http from '@/api/Http';
import { kebabIt, formatDate, scrollTo } from '@/helpers/helpers';

export default {
  name: 'NewsFeed',
  props: {
    filters: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      posts: [],
      transition: 'preview-appear',
    };
  },
  computed: {
    reading() { return this.filters.post; },
    feed() {
      const filterBy = {
        post: (filter, { id }) => filter === id,
        author: (filter, { author }) => filter === this.kebabIt(author),
      };

      if (!Object.keys(this.filters).length) return this.posts;

      return this.posts
        .filter(post => Object.keys(this.filters)
          .every(filter => filterBy[filter](this.filters[filter], post)));
    },
  },
  methods: {
    kebabIt,
    formatDate,
    scrollTo,
    getBgImage(src) {
      return { backgroundImage: `url(${src})` };
    },
    stackPosts(posts) {
      let interval;

      const stack = () => {
        this.posts.push(posts.shift());
        if (!posts.length) {
          this.transition = 'preview';
          clearInterval(interval);
        }
      };

      interval = setInterval(stack, 125);
    },
  },
  mounted() { // call on mounted not on created because of transition efx
    Http.get('/feed').then((response) => {
      console.log(response);
      if (!Object.keys(this.filters).length) {
        this.stackPosts(response.data);
      } else {
        this.posts = response.data;
        this.transition = 'preview';
      }
    });
  },
};
</script>
