import { api } from './api';

const baseURL = 'company';

const getAll = () => api.get(baseURL);

const create = (data) => api.post(baseURL, data);

const service = {
  getAll,
  create,
};

export default service;
