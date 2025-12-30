import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import classNames from 'classnames';
import CustomDataTable from '../../../../../components/CustomDataTable';
import Pagination from '../../../../../components/Pagination';
import CustomLoader from '../../../../../components/CustomLoader';
import ErrorMessage from '../../../../../components/ErrorMessage';
import useFetchSiteActivityList from './hooks/useFetchSiteActivityList';
import { SiteActivity } from '../../../../../types/udose/siteActivity';
import { SITE_ACTIVITY_STATUS_OPTIONS } from '../../../../../constants/statusOptions';
import { STATUS_INACTIVE } from '../../../../../constants/constants';
import Spinner from '../../../../../components/Spinner';
import { formattedDate, humanReadableDate } from '../../../../../helpers';

const SiteActivityList: React.FC = () => {
  const {
    pageNumber,
    isError,
    data,
    isFetching,
    handlePageChange,
    handleOnClick,
    activityPropertyBytype,
  } = useFetchSiteActivityList();

  const activityIconColumnFormatter = (row: SiteActivity) => {
    return (
      <div className="avatar-sm">
        <span
          className={classNames(
            'avatar-title',
            `bg-${activityPropertyBytype(row).colorVariant}-lighten`,
            `text-${activityPropertyBytype(row).colorVariant}`,
            'rounded'
          )}>
          <i
            className={classNames(activityPropertyBytype(row).icon, 'font-24')}
          />
        </span>
      </div>
    );
  };

  const activityColumnFormatter = (row: SiteActivity) => {
    return (
      <>
        <h5 className="font-15 mb-1 fw-normal">
          {`${row.user?.first_name} ${row.user?.last_name} ${activityPropertyBytype(row).message}`}
          {row.status === STATUS_INACTIVE && (
            <Spinner type="bordered" size="sm" className="custom-spinner" />
          )}
        </h5>
        {row?.detail && (
          <span className="text-muted font-13">{`Setting For: ${row.detail.key}, From: ${row.detail.old_value}, To: ${row.detail.new_value}`}</span>
        )}
      </>
    );
  };

  const dateColumnFormatter = (row: SiteActivity) => {
    return (
      <>
        <h5 className="font-15 mb-1 fw-normal">
          {formattedDate(row.created_at)}
        </h5>
        <span className="text-muted font-13">
          {humanReadableDate(row.created_at)}
        </span>
      </>
    );
  };

  const statusColumnFormatter = (row: SiteActivity) => {
    return (
      <h5 className="font-15 mb-1 fw-normal">
        {SITE_ACTIVITY_STATUS_OPTIONS[row.status]}
      </h5>
    );
  };

  const columns = [
    {
      dataField: '',
      text: '',
      formatter: activityIconColumnFormatter,
    },

    {
      dataField: 'activity',
      text: 'Activity',
      formatter: activityColumnFormatter,
    },
    {
      dataField: 'date',
      text: 'Date',
      formatter: dateColumnFormatter,
    },
    {
      dataField: 'status',
      text: 'Status',
      formatter: statusColumnFormatter,
    },
  ];

  if (isError) return <ErrorMessage />;

  if (isFetching) return <CustomLoader />;

  return (
    <>
      <Row className="my-2">
        <Col>
          <div className="float-end">
            <Button
              variant="outline"
              type="submit"
              disabled={isFetching}
              className="btn btn-sm btn-outline-secondary ms-2"
              onClick={handleOnClick}>
              <i className="mdi mdi-autorenew" />
            </Button>
          </div>
        </Col>
      </Row>
      <CustomDataTable columns={columns} data={data!.data} />
      <Pagination
        data={data?.meta_data?.pagination}
        pageNumber={pageNumber}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default SiteActivityList;
