import React from 'react';
import PageTitle from '../../../../components/PageTitle';

import CustomLoader from '../../../../components/CustomLoader';
import ErrorMessage from '../../../../components/ErrorMessage';
import useReadLabReport from '../hooks/useReadLabReport';
import { prepareDynamicUrl } from '../../../../helpers';
import { LAB_REPORT_LIST, LAB_REPORT_VIEW } from '../../../../constants/path';
import {
  LAB_SAMPLE_TYPE_DUNG,
  LAB_SAMPLE_TYPE_WATER,
} from '../../../../constants/labConstants';
import PastureLabReport from './PastureLabReport';
import WaterLabReport from './WaterLabReport';
import DungLabReport from './DungLabReport';

const ViewLabReport: React.FC = () => {
  const { data, isFetching, isError } = useReadLabReport();

  if (isFetching) {
    return <CustomLoader />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  const getLabReportByType = (labSampleType: string) => {
    switch (labSampleType) {
      case LAB_SAMPLE_TYPE_WATER:
        return <WaterLabReport reportData={data} />;

      case LAB_SAMPLE_TYPE_DUNG:
        return <DungLabReport />;

      default:
        return <PastureLabReport reportData={data} />;
    }
  };

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Lab Reports', path: LAB_REPORT_LIST },
          {
            label: 'Lab Report',
            path: prepareDynamicUrl(LAB_REPORT_VIEW, data?.id),
            active: true,
          },
        ]}
        title="Lab Report"
      />
      {getLabReportByType(data?.lab_samples?.[0]?.lab_sample_type?.name)}
    </>
  );
};

export default ViewLabReport;
