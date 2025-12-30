// @flow
import React, { Suspense, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Outlet } from 'react-router-dom';

// actions
import { changeLayout } from '../../redux/actions';
import * as layoutConstants from '../../constants/layout';

// code splitting and lazy loading
// https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52
const Topbar = React.lazy(() => import('../Topbar'));
const Navbar = React.lazy(() => import('./Navbar'));
const Footer = React.lazy(() => import('../Footer'));

const loading = () => <div className="text-center" />;

const HorizontalLayout = () => {
  const dispatch = useDispatch();
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  /**
   * Open the menu when having mobile screen
   */
  const openMenu = () => {
    setIsMenuOpened(!isMenuOpened);
    if (document.body) {
      if (isMenuOpened) {
        document.body.classList.remove('sidebar-enable');
      } else {
        document.body.classList.add('sidebar-enable');
      }
    }
  };

  useEffect(() => {
    dispatch(changeLayout(layoutConstants.LAYOUT_HORIZONTAL));
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      <div className="wrapper">
        <div className="content-page">
          <div className="">
            <div className="header-div">
              <Suspense fallback={loading()}>
                <Topbar
                  openLeftMenuCallBack={openMenu}
                  navCssClasses="topnav-navbar"
                  topbarDark={false}
                />
              </Suspense>

              <Suspense fallback={loading()}>
                <Navbar isMenuOpened={isMenuOpened} />
              </Suspense>
            </div>

            <div className="content">
              <Container fluid>
                <Outlet />
              </Container>
            </div>
          </div>

          <Suspense fallback={loading()}>
            <Footer />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default HorizontalLayout;
