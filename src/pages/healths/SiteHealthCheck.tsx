import React from 'react';
import { Card, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CustomLoader from '../../components/CustomLoader';
import PageTitle from '../../components/PageTitle';
import { prepareDynamicUrl, tabularDate } from '../../helpers';
import CustomDataTable from '../../components/CustomDataTable';
import Pagination from '../../components/Pagination';
import useFetchHealthCheckSummary from './hooks/useFetchHealthCheckSummary';
import { UDOSE_VIEW } from '../../constants/path';
import ErrorMessage from '../../components/ErrorMessage';
import usePropertiesDropdown from '../../hooks/dropdown/usePropertiesDropdown';
import { SiteHealthCheckSumamry } from '../../types/siteHealthCheck';
import HealthFilterSection from './HealthFilterSection';

const SiteHealthCheck: React.FC = () => {
  const {
    data: propertiesOptions,
    isError: isErrorProperties,
    isFetching: isFetchingProperties,
  } = usePropertiesDropdown();

  const {
    data,
    isError,
    isFetching,
    handlePageChange,
    handleSearchOnChange,
    search,
    pageNumber,
    property,
    setProperty,
    setSearch,
  } = useFetchHealthCheckSummary();

  const healthMessageFormatter = (row: SiteHealthCheckSumamry) => {
    return (
      <ul>
        {row?.health_message.map((message) => {
          return <li key={message}> {message}</li>;
        })}
      </ul>
    );
  };

  const createdDateFormatter = (row: SiteHealthCheckSumamry) => {
    return tabularDate(row?.created_at);
  };

  const siteNameFormatter = (row: SiteHealthCheckSumamry) => {
    return (
      <Link
        to={prepareDynamicUrl(UDOSE_VIEW, row.site_id)}
        target="_blank"
        className="text-primary">
        {row.name.slice(0, 30) + ((row.name.length > 30 && '...') || '')}
        <i className="bx bx-link-external ms-1" />
      </Link>
    );
  };

  const columns = [
    {
      dataField: 'name',
      text: 'Site Name',
      formatter: siteNameFormatter,
    },
    {
      dataField: 'health_status',
      text: 'Status',
    },
    {
      dataField: 'created_at',
      text: 'Last Checked',
      formatter: createdDateFormatter,
    },
    {
      dataField: 'messages',
      text: 'Message',
      formatter: healthMessageFormatter,
    },
  ];

  if (isError || isErrorProperties) {
    return <ErrorMessage />;
  }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: 'Sites Health Check',
            path: '/sites/udose/list',
            active: true,
          },
        ]}
        title="Site Health Check"
      />
      <Card>
        <Card.Body>
          <Row className="mb-3">
            <HealthFilterSection
              search={search}
              handleSearchOnChange={handleSearchOnChange}
              setSearch={setSearch}
              property={property}
              setProperty={setProperty}
              propertiesOptions={propertiesOptions}
            />
          </Row>
          {isFetching || isFetchingProperties ? (
            <CustomLoader />
          ) : (
            <>
              <CustomDataTable columns={columns} data={data!.body} />
              <Pagination
                data={data?.meta_data?.pagination}
                pageNumber={pageNumber}
                handlePageChange={handlePageChange}
              />
            </>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default SiteHealthCheck;
