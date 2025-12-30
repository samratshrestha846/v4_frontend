// @flow
import { combineReducers } from 'redux';

import Auth from './auth/reducers';
import Layout from './layout/reducers';
import Log from './logs/reducers';
import Site from './site/reducers';
import Tank from './tank/reducers';
import Property from './property/reducers';

export default combineReducers({
  Auth,
  Layout,
  Log,
  Site,
  Tank,
  Property,
});
