import { APICoreP } from './apiCoreP';
import config from '../../../config';

class HttpApi extends APICoreP {
  constructor() {
    super(config.DIT_CONNECT_API_URL);
  }
}

export default HttpApi;
