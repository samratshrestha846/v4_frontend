import { APICore } from './apiCore';

const api = new APICore();
const properties = '/customer-properties';

const listProperties = (params: any) => {
  return api.get(properties, params);
};

// eslint-disable-next-line import/prefer-default-export
export { listProperties };
