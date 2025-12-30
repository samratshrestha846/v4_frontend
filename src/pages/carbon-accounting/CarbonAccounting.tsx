import React from 'react';
import PageTitle from '../../components/PageTitle';
import CustomTabs from '../../components/CustomTabs';
import { TabOption } from '../../types/common';
import ListCarbonTopPerformerCustomer from './carbon-credits/customers/ListCarbonTopPerformerCustomer';
import ListCarbonTopPerformerProperties from './carbon-credits/properties/ListCarbonTopPerformerProperties';
import ListCarbonTopPerformerSites from './carbon-credits/sites/ListCarbonTopPerformerSites';
import CarbonAnalytics from './carbon-analytics/CarbonAnalytics';
import CarbonEmissionReductionSummary from './carbon-analytics/CarbonEmissionReductionSummary';

const CarbonAccounting: React.FC = () => {
  const tabOptions: TabOption[] = [
    {
      eventKey: 'customer',
      title: 'Customer',
      tabContent: <ListCarbonTopPerformerCustomer />,
      iconClassName: 'bx bx-group',
    },
    {
      eventKey: 'property',
      title: 'Property',
      tabContent: <ListCarbonTopPerformerProperties />,
      iconClassName: 'bx bx-layer',
    },
    {
      eventKey: 'site',
      title: 'Site',
      tabContent: <ListCarbonTopPerformerSites />,
      iconClassName: 'bx bx-sitemap',
    },
  ];
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: 'Carbon Accounting',
            path: '/carbon-accounting',
            active: true,
          },
        ]}
        title="Carbon Accounting"
      />
      <CarbonAnalytics />
      <CarbonEmissionReductionSummary />
      <CustomTabs tabs={tabOptions} wrapperClass="carbon-credit-tabs" />
    </>
  );
};

export default CarbonAccounting;
