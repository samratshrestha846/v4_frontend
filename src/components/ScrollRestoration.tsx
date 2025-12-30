import React, { useEffect } from 'react';
import {
  getLocalStorageScrollData,
  setLocalStorageScrollData,
} from '../helpers';

const ScrollRestoration: React.FC = () => {
  const scrollY = getLocalStorageScrollData(window.location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setLocalStorageScrollData(
        window.location.pathname,
        window.scrollY.toString()
      );
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, Number(scrollY));
  }, [window.location.pathname]);

  return null;
};

export default ScrollRestoration;
