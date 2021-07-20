import { api } from './api';
import { getToken } from '$utils';

const baseURL = 'company';

const getAll = () => api.get(baseURL);

const create = async (data) => {
  const token = await getToken();
  return api.post(baseURL, data, { headers: { 'Authorization': token } });
};

const service = {
  getAll,
  create,
};

export default service;
