import React from 'react';
import PageTitle from '../../../components/PageTitle';
import CustomTabs from '../../../components/CustomTabs';
import { TabOption } from '../../../types/common';
import UserAccount from './UserAccount';

const ViewUser: React.FC = () => {
  const tabOptions: TabOption[] = [
    {
      eventKey: 'myaccount',
      title: 'User Account',
      tabContent: <UserAccount />,
      iconClassName: 'bx bx-user-circle',
    },
  ];

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: 'Users ',
            path: '/users/list',
          },
          {
            label: 'User Detail',
            path: '',
            active: true,
          },
        ]}
        title="User Detail"
      />

      <CustomTabs tabs={tabOptions} wrapperClass="settings-tabs" />
    </>
  );
};

export default ViewUser;
