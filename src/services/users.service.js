import { api } from './api';
import { getToken } from '../utils';

const baseURL = 'user';

const create = async (data) => {
  const token = await getToken();
  console.log(token);
  return api.post(baseURL, data, { headers: { 'Authorization': token } });
};

const service = {
  create,
};

export default service;
