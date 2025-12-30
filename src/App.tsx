// @flow
import React, { StrictMode } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Routes from './routes/Routes';

import 'react-toastify/dist/ReactToastify.css';
// Themes

import 'react-datepicker/dist/react-datepicker.css';

// For Saas import Saas.scss
import './assets/scss/Saas.scss';
// For Dark import Saas-Dark.scss
//  import './assets/scss/Saas-Dark.scss';

// For Modern demo import Modern.scss
// import './assets/scss/Modern.scss';
// For Modern dark demo import Modern-Dark.scss
// import './assets/scss/Modern-Dark.scss';

// For Creative demo import Creative.scss
// import './assets/scss/Creative.scss';
// For Creative dark demo import Creative-Dark.scss
// import './assets/scss/Creative-Dark.scss';

/**
 * Main app component
 */
const queryClient: QueryClient = new QueryClient();
const App: React.FC = () => {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Routes />
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </StrictMode>
  );
};

export default App;
