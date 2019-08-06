/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import feedData from '@/mockData/feed';
import posts from '@/mockData/posts';

const axiosInstance = axios.create();
const mock = new MockAdapter(axiosInstance, {
  delayResponse: 200,
});

mock.onGet('/feed').reply(200, feedData);

mock.onGet('/post').reply((config) => {
  const response = posts.filter(post => post.id === config.params.id);
  response.unshift(200);

  return response;
});

export default axiosInstance;
