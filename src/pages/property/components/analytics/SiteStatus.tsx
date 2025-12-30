import React from 'react';
import { Card, ListGroup, ProgressBar } from 'react-bootstrap';
import { useUdoseAnalyticsContext } from '../../../../context/useUdoseAnalyticsContext';

const SiteStatus = () => {
  const { dashboardAnalytics } = useUdoseAnalyticsContext();

  return (
    <Card className="">
      <Card.Header as="h5" className="px-2 fw-meium text-primary-color">
        Site Status
      </Card.Header>
      <Card.Body className="p-2">
        <h5 className="text-gray fw-normal text-center m-0 pb-1">
          {dashboardAnalytics?.countData?.total_sites} uDOSEs Installed
        </h5>

        <ProgressBar className="progress-sm">
          <ProgressBar
            variant="success"
            now={
              dashboardAnalytics?.countData?.total_sites > 0
                ? (dashboardAnalytics?.countData?.running_sites ??
                    0 / dashboardAnalytics.countData.total_sites) * 100
                : 0
            }
          />
          <ProgressBar
            variant="danger"
            now={
              dashboardAnalytics?.countData?.total_sites > 0
                ? (dashboardAnalytics?.countData?.alarmed_sites ??
                    0 / dashboardAnalytics.countData.total_sites) * 100
                : 0
            }
          />
          <ProgressBar
            variant="warning"
            now={
              dashboardAnalytics?.countData?.total_sites > 0
                ? (dashboardAnalytics?.countData?.stopped_sites ??
                    0 / dashboardAnalytics.countData.total_sites) * 100
                : 0
            }
          />
        </ProgressBar>

        <ListGroup className="mt-2">
          <ListGroup.Item className="d-flex justify-content-between align-items-center border-0 p-1">
            <div className="d-flex gap-1 justify-content-between align-items-center">
              <small className="mdi mdi-checkbox-blank-circle text-success align-middle me-1" />
              <h5 className="m-0 text-gray fw-normal"> Running</h5>
            </div>
            <span className="text-gray fw-bold">
              {dashboardAnalytics?.countData?.running_sites || 0}
            </span>
          </ListGroup.Item>

          <ListGroup.Item className="d-flex justify-content-between align-items-center border-0 p-1">
            <div className="d-flex gap-1 justify-content-between align-items-center">
              <small className="mdi mdi-checkbox-blank-circle text-danger align-middle me-1" />
              <h5 className="m-0 text-gray fw-normal"> Alarmed</h5>
            </div>
            <span className="text-gray fw-bold">
              {dashboardAnalytics?.countData?.alarmed_sites || 0}
            </span>
          </ListGroup.Item>

          <ListGroup.Item className="d-flex justify-content-between align-items-center border-0 p-1">
            <div className="d-flex gap-1 justify-content-between align-items-center">
              <small className="mdi mdi-checkbox-blank-circle text-warning align-middle me-1" />
              <h5 className="m-0 text-gray fw-normal"> Stopped</h5>
            </div>
            <span className="text-gray fw-bold">
              {dashboardAnalytics?.countData?.stopped_sites || 0}
            </span>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default SiteStatus;
