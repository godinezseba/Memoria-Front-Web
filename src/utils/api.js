import axios from 'axios';

export const endpoints = {
  development: 'localhost:8081/v1',
};

export const api = axios.create({
  baseURL: endpoints[NODE_ENV],
});
