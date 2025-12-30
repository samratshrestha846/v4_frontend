import React, { FC } from 'react';
import PageTitle from '../../../../components/PageTitle';
import { UBOT_LIST } from '../../../../constants/path';
import useReadUbotSite from '../hooks/useReadUbotSite';
import CustomLoader from '../../../../components/CustomLoader';
import ErrorMessage from '../../../../components/ErrorMessage';

import UbotDetail from '../components/UbotDetail';
import UbotMonitoring from './monitoring/UbotMonitoring';
import UbotRainfall from './rainfall/UbotRainfall';
import UbotCommunicationMessage from '../../../dashboard/ubots/UbotCommunicationMessage';

const ViewUbotSite: FC = () => {
  const { data: ubotDetail, isFetching, isError } = useReadUbotSite();

  if (isFetching) {
    <CustomLoader />;
  }

  if (isError) {
    <ErrorMessage />;
  }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'uBot Sites', path: UBOT_LIST },
          {
            label: `${ubotDetail ? ubotDetail.name : 'Site Detail'}`,
            path: UBOT_LIST,
            active: true,
          },
        ]}
        title="uBot Site Detail"
      />
      <UbotCommunicationMessage ubotDetail={ubotDetail} />

      <UbotDetail ubotDetail={ubotDetail} />

      <UbotMonitoring />

      <UbotRainfall />
    </>
  );
};

export default ViewUbotSite;
