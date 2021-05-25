import { api } from './api';
import { getToken } from '../utils';

const baseURL = 'user';

const create = async (data) => {
  const token = await getToken();
  return api.post(baseURL, data, { headers: { 'Authorization': token } });
};

const getData = async () => {
  const token = await getToken();
  return api.get(baseURL, { headers: { 'Authorization': token } });
}

const service = {
  create,
  getData,
};

export default service;
