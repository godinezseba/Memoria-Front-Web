import axios from 'axios';

const NODE_ENV = 'development';


export const endpoints = {
  development: 'http://localhost:8081/v1',
};

export const api = axios.create({
  baseURL: endpoints[NODE_ENV],
});
