import React from 'react';
import ReactDOM from 'react-dom';
import './i18n';
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import initialStoreState from './types/redux/store-type';

import App from './App';
import loadAnalytics from './utils/ga/load-analytics';
import config from './config';

const INIT_STORE_STATE: initialStoreState = {
  Auth: undefined,
  Layout: undefined,
  Log: undefined,
  Site: undefined,
  Tank: undefined,
  Property: undefined,
};

ReactDOM.render(
  <Provider store={configureStore(INIT_STORE_STATE)}>
    <App />
  </Provider>,
  document.getElementById('root')
);

if (config.GA_TRACKING_ID) loadAnalytics();
