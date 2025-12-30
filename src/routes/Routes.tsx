import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AllRoutes from './index';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <AllRoutes />
    </BrowserRouter>
  );
};

export default Routes;
