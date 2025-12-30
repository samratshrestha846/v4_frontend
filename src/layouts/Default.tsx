// @flow
import React, { useEffect, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const loading = () => <div className="" />;

const DefaultLayout = () => {
  useEffect(() => {
    if (document.body) document.body.classList.add('authentication-bg');

    return () => {
      if (document.body) document.body.classList.remove('authentication-bg');
    };
  }, []);

  return (
    <Suspense fallback={loading()}>
      <Outlet />
    </Suspense>
  );
};
export default DefaultLayout;
