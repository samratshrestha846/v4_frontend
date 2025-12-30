import React from 'react';

import MyAccount from './my-account/MyAccount';
import ChangePassword from './change-password/ChangePassword';
import PageTitle from '../../../components/PageTitle';
import { TabOption } from '../../../types/common';
import CustomTabs from '../../../components/CustomTabs';

const Settings: React.FC = () => {
  const tabOptions: TabOption[] = [
    {
      eventKey: 'myaccount',
      title: 'My Account',
      tabContent: <MyAccount />,
      iconClassName: 'bx bx-user-circle',
    },
    {
      eventKey: 'changepassword',
      title: 'Change Password',
      tabContent: <ChangePassword />,
      iconClassName: 'bx bx-wrench',
    },
  ];

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: 'Settings',
            path: '',
            active: true,
          },
        ]}
        title="Settings "
      />
      <CustomTabs tabs={tabOptions} wrapperClass="settings-tabs" />
    </>
  );
};

export default Settings;
