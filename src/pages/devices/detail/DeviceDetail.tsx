import React from 'react';
import { Col, Row } from 'react-bootstrap';
import PageTitle from '../../../components/PageTitle';
import AddViewNotes from '../../common/AddViewNotes';
import DeviceStockHistory from '../components/DeviceStockHistory';
import DoserUsage from '../components/DoserUsage';
import { DEVICE_CONFIGURATION_TYPE_UDOSE } from '../../../constants/constants';
import useAuth from '../../../hooks/useAuth';
import CustomLoader from '../../../components/CustomLoader';
import useFetchDeviceLocation from '../hooks/useFetchDeviceLocation';
import DeviceLocation from './DeviceLocation';
import SiteInfo from './SiteInfo';
import useReadDevice from '../hooks/useReadDevice';
import DeviceInfo from '../components/DeviceInfo';
import ErrorMessage from '../../../components/ErrorMessage';

const DeviceDetail: React.FC = () => {
  const { isSuperAdmin, isAdmin } = useAuth();

  const { updateLocation } = useFetchDeviceLocation();
  const { data, isFetching, refetch, isError } = useReadDevice();

  if (isFetching) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Devices', path: '/devices/list' },
          {
            label: `${data?.serial_number}`,
            path: '/users/view',
            active: true,
          },
        ]}
        title="View Device"
      />
      <Row>
        <Col lg={4}>
          <DeviceInfo device={data} />
          <SiteInfo site={data?.site} />

          {data?.device_configuration?.type ===
            DEVICE_CONFIGURATION_TYPE_UDOSE && (
            <DoserUsage doserUsage={data?.doser_usage} refetch={refetch} />
          )}
        </Col>

        <Col lg={8}>
          <DeviceStockHistory stockTypeHistory={data?.stock_type_history} />
          {(isSuperAdmin || isAdmin) && (
            <AddViewNotes modelType="device" logData={data?.log} />
          )}
          <DeviceLocation device={data} updateLocation={updateLocation} />
        </Col>
      </Row>
    </>
  );
};

export default DeviceDetail;
