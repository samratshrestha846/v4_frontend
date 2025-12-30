/* eslint-disable import/no-relative-packages */
import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import Image from '@uhub/components/Image';
// import { DIT_CONNECT_DASHBOARD } from '@project/ditconnect/constants/path';
import { WORK_DIARY_LIST } from '@project/ditconnect/daily-diary/work-diary/constants/constant';
import { usePlatformContext } from '../../../context/usePlatformContext';

import UhubLogo from '../../../assets/images/uhub-logo.png';
import DitConnectLogo from '../../../assets/images/dit-connect-logo.png';
import {
  PLATFORM_DITCONNECT,
  PLATFORM_NEVILLE,
  PLATFORM_UHUB,
  PLATFORM_UNIFIED,
} from '../../../constants/platformConstants';
import { UNIFIED_DASHBOARD } from '../constants/path';
import { NEVILLE_AUTH } from '../../neville/constant';

const PlatformSwitchingButtonList = () => {
  const navigate = useNavigate();

  const { activePlatform } = usePlatformContext();

  const appPlatforms = [
    {
      title: 'Dashboard',
      platform: PLATFORM_UNIFIED,
      path: UNIFIED_DASHBOARD,
      icon: 'bx bxs-dashboard',
    },
    {
      title: 'uHUB',
      platform: PLATFORM_UHUB,
      path: '/dashboard',
      icon: (
        <Image
          src={UhubLogo}
          fallbackSrc="/"
          alt="uHUB"
          className="avatar-xs"
        />
      ),
    },
    {
      title: 'DIT Connect',
      platform: PLATFORM_DITCONNECT,
      path: WORK_DIARY_LIST,
      icon: (
        <Image
          src={DitConnectLogo}
          fallbackSrc="/"
          alt="DIT Connect"
          className="avatar-xs"
        />
      ),
    },
    {
      title: 'Neville',
      platform: PLATFORM_NEVILLE,
      path: NEVILLE_AUTH,
      icon: (
        <Image
          src={DitConnectLogo}
          fallbackSrc="/"
          alt="Neville"
          className="avatar-xs"
        />
      ),
    },
  ];

  return (
    <div className="d-flex justify-content-start align-items-center gap-1">
      {appPlatforms?.map((platform, key) => (
        <Button
          key={key}
          variant="outline"
          size="sm"
          onClick={() => navigate(platform.path)}
          type="button"
          className={classNames(
            'btn-outline-primary',
            activePlatform.platform === platform.platform
              ? 'bg-primary text-white'
              : ''
          )}>
          <div className="d-flex justify-content-center align-items-center gap-1">
            {typeof platform.icon === 'string' ? (
              <i className={classNames(platform.icon, 'font-24')} />
            ) : (
              platform.icon
            )}

            <span className="platform-title fw-semibold">{platform.title}</span>
          </div>
        </Button>
      ))}
    </div>
  );
};

export default PlatformSwitchingButtonList;
