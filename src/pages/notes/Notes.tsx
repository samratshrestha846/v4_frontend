import React from 'react';
import PageTitle from '../../components/PageTitle';
import CustomTabs from '../../components/CustomTabs';
import { TabOption } from '../../types/common';
import ListMaintenanceNotes from './maintenance/ListMaintenanceNotes';
import ListSupplementDeliveryNotes from './supplement-delivery/ListSupplementDeliveryNotes';

const Notes: React.FC = () => {
  const tabOptions: TabOption[] = [
    {
      eventKey: 'maintenance',
      title: 'Maintenance',
      tabContent: <ListMaintenanceNotes />,
      iconClassName: 'bx bx-wrench',
    },
    {
      eventKey: 'supplement-delivery',
      title: 'Supplement Delivery',
      tabContent: <ListSupplementDeliveryNotes />,
      iconClassName: 'bx bxs-truck',
    },
  ];

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Notes', path: '/notes/list', active: true },
        ]}
        title="Notes"
      />
      <CustomTabs tabs={tabOptions} />
    </>
  );
};

export default Notes;
