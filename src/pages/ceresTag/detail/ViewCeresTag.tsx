import { useParams } from 'react-router-dom';
import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import PageTitle from '../../../components/PageTitle';
import { CERES_TAGS_LIST, CERES_TAGS_VIEW } from '../../../constants/path';
import TagTabs from './TagTabs';
import useReadCeresTag from '../hooks/useReadCeresTag';
import CustomLoader from '../../../components/CustomLoader';
import ErrorMessage from '../../../components/ErrorMessage';
import CeresTagInfo from '../components/CeresTagInfo';
import DeviceTemperatureGraph from '../components/DeviceTemperatureGraph';

const ViewCeresTag: React.FC = () => {
  const { id } = useParams();

  const { data: ceresTagDetail, isFetching, isError } = useReadCeresTag();

  if (isFetching) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Ceres Tags', path: CERES_TAGS_LIST, active: false },
          {
            label: ceresTagDetail?.vid ?? 'Ceres Tag Detail',
            path: CERES_TAGS_VIEW,
            active: true,
          },
        ]}
        title="Ceres Tag Detail"
      />

      <Card>
        <Card.Header as="h5" className="text-primary-color">
          {ceresTagDetail?.vid}
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <CeresTagInfo ceresTagDetail={ceresTagDetail} />
            </Col>
            <Col md={6}>
              <DeviceTemperatureGraph />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <TagTabs ceresTagId={id} ceresTagDetail={ceresTagDetail} />
    </>
  );
};

export default ViewCeresTag;
