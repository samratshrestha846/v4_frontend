import HttpApi from '@project/ditconnect/Http/http';
import CustomLoader from '@uhub/components/CustomLoader';
import React, { useEffect } from 'react';
import config from '../../config';

const RedirectToNeville: React.FC = () => {
  useEffect(() => {
    const apiCore = new HttpApi();
    const userSession = apiCore.getLoggedInUser();
    document.cookie = `accessToken=${userSession.token}; domain=${config.NEVILLE_BASE_DOMAIN}; path=/; Secure; SameSite=Lax`;
    const timer = setTimeout(() => {
      window.location.href = config.NEVILLE_URL;
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return <CustomLoader />;
};

export default RedirectToNeville;
