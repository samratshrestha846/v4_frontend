import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { useParams } from 'react-router-dom';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { prepareDynamicUrl } from '@uhub/helpers';
import SiteMaintenanceForm from './SiteMaintenanceForm';
import useReadSiteMaintenance from './hooks/useReadSiteMaintenance';
import {
  SITE_MAINTENANCE_EDIT,
  SITE_MAINTENANCE_LIST,
} from './constants/constant';

const EditSiteMaintenance: React.FC = () => {
  const { id } = useParams();

  const title: string = 'Site Maintance';
  const { data, isFetching, isError } = useReadSiteMaintenance(id);

  if (isFetching || !data) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title}`, path: SITE_MAINTENANCE_LIST, active: false },
          {
            label: `Edit ${title}`,
            path: prepareDynamicUrl(SITE_MAINTENANCE_EDIT, id),
            active: true,
          },
        ]}
        title={`Edit ${title}`}
      />
      <Card>
        <Card.Body>
          {data && (
            <SiteMaintenanceForm
              defaultValues={{
                date: new Date(data.date),
                site_id: data.site_id,
                device_id: data.device_id,
                customer_notes: data.customer_notes,
                admin_notes: data.admin_notes,
                attachmentResponses: data.attachments,
              }}
            />
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default EditSiteMaintenance;
