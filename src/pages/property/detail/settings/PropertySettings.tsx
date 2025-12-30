/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import PageTitle from '../../../../components/PageTitle';
import OptiweighSettings from './optiweigh/OptiweighSettings';
import SubscriptionSettings from './subscriptions/SubscriptionSettings';
import useReadProperty from '../../hooks/useReadProperty';
import CustomLoader from '../../../../components/CustomLoader';
import ErrorMessage from '../../../../components/ErrorMessage';

const PropertySettings: React.FC = () => {
  const { id } = useParams();

  const {
    data: property,
    isFetching: isFetchingProperty,
    isError: isErrorProperty,
    refetch: refetchProperty,
  } = useReadProperty(Number(id));

  if (isFetchingProperty) {
    return <CustomLoader />;
  }

  if (isErrorProperty) {
    return <ErrorMessage />;
  }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: 'Properties',
            path: '/properties/list',
          },
          {
            label: 'Settings',
            active: true,
            path: '',
          },
        ]}
        title="Settings"
      />
      <div>
        <Row>
          <Col sm={8}>
            <SubscriptionSettings
              property={property}
              refetchProperty={refetchProperty}
            />
          </Col>
          <Col sm={4}>
            <OptiweighSettings
              property={property}
              refetchProperty={refetchProperty}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default PropertySettings;
