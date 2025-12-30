import { TabOption } from '@uhub/types/common';
import React from 'react';
import PageTitle from '@uhub/components/PageTitle';
import CustomTabs from '@uhub/components/CustomTabs';
import ListSummary from './ListSummary';
import ListSupplementInventory from '../../supplement-inventory/pages/ListSupplementInventory';
import { DIT_CONNECT_STOCK_AVAILABILITY_ACTIVE_TAB } from '../../constants/constant';

const StockAvailabilityTab: React.FC = () => {
  const tabOptions: TabOption[] = [
    {
      eventKey: 'summary',
      title: 'Summary',
      tabContent: <ListSummary />,
      iconClassName: 'bx bx-group',
    },
    {
      eventKey: 'supplement-inventory',
      title: 'Supplement Inventory',
      tabContent: <ListSupplementInventory />,
      iconClassName: 'bx bx-layer',
    },
  ];
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: 'Stock Availability',
            path: '/stock-availability',
            active: true,
          },
        ]}
        title="Stock Availability"
      />
      <CustomTabs
        activeTabVariable={DIT_CONNECT_STOCK_AVAILABILITY_ACTIVE_TAB}
        tabs={tabOptions}
        wrapperClass="stock-availability-tabs"
      />
    </>
  );
};

export default StockAvailabilityTab;
