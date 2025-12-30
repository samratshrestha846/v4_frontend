import { APICore } from './apiCore';

const api = new APICore();
const sites = 'sites';

const v1Sites = '/v1/sites';
const v2sites = '/v2/sites';

const v1list = (params: any) => {
  return api.get(v1Sites, params);
};

const v1Detail = (id: number, params: any) => {
  return api.get(`${v1Sites}/${id}`, params);
};

const list = (params: any) => {
  return api.get(v2sites, params);
};

const show = (id: number, params: any) => {
  return api.get(`${sites}/${id}`, params);
};

const udoseRecordSummary = (id: number) => {
  return api.get(`${sites}/${id}/udose-record-summary`);
};

export { list, show, udoseRecordSummary, v1list, v1Detail };
