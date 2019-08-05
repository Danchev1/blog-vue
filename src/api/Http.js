/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import feedData from '@/mockData/feed';

const axiosInstance = axios.create();
const mock = new MockAdapter(axiosInstance, {
  delayResponse: 1000,
});

mock.onGet('/feed').reply(200, feedData);

export default axiosInstance;
