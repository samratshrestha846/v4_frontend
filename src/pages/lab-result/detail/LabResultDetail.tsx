import React from 'react';
import PageTitle from '../../../components/PageTitle';
import useLabResultDetail from '../hooks/useLabResultDetail';
import CustomLoader from '../../../components/CustomLoader';

import ErrorMessage from '../../../components/ErrorMessage';
import WaterLabReport from '../../laboratory/lab_reports/detail/WaterLabReport';
import DungLabReport from '../../laboratory/lab_reports/detail/DungLabReport';
import PastureLabReport from '../../laboratory/lab_reports/detail/PastureLabReport';
import {
  LAB_SAMPLE_TYPE_DUNG,
  LAB_SAMPLE_TYPE_WATER,
} from '../../../constants/labConstants';

const LabResultDetail: React.FC = () => {
  const { data, isFetching, isError } = useLabResultDetail();

  if (isFetching) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

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
          {
            label: 'Lab Results',
            path: '/lab-results/list',
            active: false,
          },
          {
            label: data?.lab_samples?.[0]?.sample_id
              ? `${data?.lab_samples?.[0]?.sample_id}`
              : 'Sample Id',
            path: '/lab-results/view/:id',
            active: true,
          },
        ]}
        title="Lab Result Details"
      />
      {getLabReportByType(data?.lab_samples?.[0]?.lab_sample_type?.name)}
    </>
  );
};

export default LabResultDetail;
