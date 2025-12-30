import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PageTitle from '../../../components/PageTitle';
import BingMap from '../../../components/BingMap';
import Search from '../components/Search';
import useFetchSitesWithLocation from './hooks/useFetchSitesWithLocation';
import ErrorMessage from '../../../components/ErrorMessage';
import CustomLoader from '../../../components/CustomLoader';

const SiteMapView: React.FC = () => {
  const { data, isFetching, isError, handleSearchOnChange } =
    useFetchSitesWithLocation();

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Sites Map', path: '/sites/list', active: true },
        ]}
        title="Site Map"
      />
      <Row>
        <Col>
          <Row>
            <Col sm={4}>
              <Search handleSearchOnChange={handleSearchOnChange} />
            </Col>
          </Row>

          {isFetching ? <CustomLoader /> : <BingMap data={data} />}
        </Col>
      </Row>
    </>
  );
};

export default SiteMapView;
