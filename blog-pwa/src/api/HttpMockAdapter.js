import axios from 'axios';
import axiosMock from 'axios-mock-adapter';

const axiosInstance = axios.create();
const mock = new MockAdapter(axiosInstance);
