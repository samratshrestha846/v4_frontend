import { APICore } from './apiCore';

const api = new APICore();

const fetchLogs = (params: any) => {
  const baseUrl = '/logs';
  return api.get(baseUrl, params);
};

// eslint-disable-next-line import/prefer-default-export
export { fetchLogs };
