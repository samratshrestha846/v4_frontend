import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import SiteMaintenanceForm from './SiteMaintenanceForm';
import { SiteMaintenanceFormProps } from './types/siteMaintenance';
import {
  SITE_MAINTENANCE_ADD,
  SITE_MAINTENANCE_LIST,
} from './constants/constant';

const AddSiteMaintenance: React.FC = () => {
  const title: string = 'Site Maintance';
  const defaultValues: SiteMaintenanceFormProps = {
    date: new Date(),
    site_id: null,
    device_id: null,
    customer_notes: null,
    admin_notes: null,
    attachments: null,
  };
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title}`, path: SITE_MAINTENANCE_LIST, active: false },
          {
            label: `Add ${title}`,
            path: SITE_MAINTENANCE_ADD,
            active: true,
          },
        ]}
        title={`Add ${title}`}
      />
      <Card>
        <Card.Body>
          <SiteMaintenanceForm defaultValues={defaultValues} />
        </Card.Body>
      </Card>
    </>
  );
};

export default AddSiteMaintenance;
