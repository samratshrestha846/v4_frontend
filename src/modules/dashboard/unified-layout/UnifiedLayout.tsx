/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-shadow */
// @flow
import React, { Suspense, useCallback, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import initialStoreState from '@uhub/types/redux/store-type';

// actions
import { changeSidebarType } from '../../../redux/actions';

// utils
// eslint-disable-next-line import/named
import { changeBodyAttribute } from '../../../utils/utils';

// constants
import * as layoutConstants from '../../../constants/layout';
import { NotificationContextProvider } from '../../../context/useNotificationContext';

import UnifiedTopbar from './UnifiedTopbar';
import { PlatformContextProvider } from '../../../context/usePlatformContext';

const Footer = React.lazy(() => import('../../../layouts/Footer'));

const loading = () => <div className="" />;

const UnifiedLayout = () => {
  const dispatch = useDispatch();
  const { layoutColor, leftSideBarTheme, leftSideBarType, layoutWidth } =
    useSelector((state: initialStoreState) => ({
      layoutColor: state.Layout.layoutColor,
      layoutWidth: state.Layout.layoutWidth,
      leftSideBarTheme: state.Layout.leftSideBarTheme,
      leftSideBarType: state.Layout.leftSideBarType,
    }));
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  /*
   * layout defaults
   */
  useEffect(() => {
    changeBodyAttribute('data-layout', layoutConstants.LAYOUT_VERTICAL);
  }, []);

  useEffect(() => {
    changeBodyAttribute('data-layout-color', layoutColor);
  }, [layoutColor]);

  useEffect(() => {
    changeBodyAttribute('data-layout-mode', layoutWidth);
  }, [layoutWidth]);

  useEffect(() => {
    changeBodyAttribute('data-leftbar-theme', leftSideBarTheme);
  }, [leftSideBarTheme]);

  useEffect(() => {
    changeBodyAttribute('data-leftbar-compact-mode', leftSideBarType);
  }, [leftSideBarType]);

  /**
   * Open the menu when having mobile screen
   */
  const openMenu = () => {
    setIsMenuOpened((prevState) => !prevState);

    if (document.body) {
      if (isMenuOpened) {
        document.body.classList.remove('sidebar-enable');
      } else {
        document.body.classList.add('sidebar-enable');
      }
    }
  };

  const updateDimensions = useCallback(() => {
    // activate the condensed sidebar if smaller devices like ipad or tablet
    if (window.innerWidth >= 768 && window.innerWidth <= 1028) {
      dispatch(changeSidebarType(layoutConstants.LEFT_SIDEBAR_TYPE_CONDENSED));
    } else if (window.innerWidth > 1028) {
      dispatch(changeSidebarType(layoutConstants.LEFT_SIDEBAR_TYPE_FIXED));
    }
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, [dispatch, updateDimensions]);

  return (
    <PlatformContextProvider>
      <NotificationContextProvider>
        <ToastContainer />
        <div className="wrapper unified-dashboard">
          <Suspense fallback={loading()}>
            <UnifiedTopbar />
          </Suspense>

          <div className="content-page">
            <div className="content">
              <Container fluid>
                <Outlet />
              </Container>
            </div>
            <Suspense fallback={loading()}>
              <Footer />
            </Suspense>
          </div>
        </div>
      </NotificationContextProvider>
    </PlatformContextProvider>
  );
};

export default UnifiedLayout;
