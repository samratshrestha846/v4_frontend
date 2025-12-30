import React from 'react';
import PageTitle from '../../components/PageTitle';
import { can } from '../../helpers/checkPermission';
import { DOWNLOAD_REPORT } from '../../constants/permissions';
import ExportUdoseReport from './udose/ExportUdoseReport';
import ExportDeviceActivity from './deviceActivity/ExportDeviceActivity';

const ExportReport = () => {
  const canExportReport = can(DOWNLOAD_REPORT);

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: 'Export Report',
            path: '/export-report',
            active: true,
          },
        ]}
        title="Export Report"
      />
      {canExportReport && (
        <>
          <ExportUdoseReport />
          <ExportDeviceActivity />
        </>
      )}
    </>
  );
};

export default ExportReport;
