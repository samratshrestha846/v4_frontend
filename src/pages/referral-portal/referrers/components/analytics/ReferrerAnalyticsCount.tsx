import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import useReferrerAnalyticsCount from '../../hooks/useReferrerAnalyticsCount';
import CustomLoader from '../../../../../components/CustomLoader';
import { Referrer } from '../../../../../types/referrer/referrerList';
import ErrorMessage from '../../../../../components/ErrorMessage';

type Props = {
  referrer: Referrer | undefined;
  isFetchingReferrer: boolean;
};

const ReferrerAnalyticsCount: React.FC<Props> = ({
  referrer,
  isFetchingReferrer,
}) => {
  const {
    data: customersCount,
    isFetching: isFetchingAnalytics,
    isError: isErroAnalytics,
  } = useReferrerAnalyticsCount();

  if (isFetchingReferrer || isFetchingAnalytics) return <CustomLoader />;

  if (isErroAnalytics) return <ErrorMessage />;

  return (
    <Card className="">
      <Card.Body className="p-2">
        <Row>
          <Col className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-xs-12 overview-card">
            <div className="d-flex align-items-center gap-2">
              <div className="flex-shrink-0">
                <div className="avatar-sm">
                  <span className="avatar-title bg-teal rounded-circle my-0">
                    <i className="bx bx-money font-20" />
                  </span>
                </div>
              </div>
              <div className="flex-grow-1">
                <h3 className="text-black  fw-bold my-1">{`$${
                  referrer ? referrer.total_earning.toFixed(4) : 0
                }`}</h3>
                <h6 className="text-black-50 fw-bold" title="Earned">
                  Earned
                </h6>
              </div>
            </div>
          </Col>
          <Col className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-xs-12 overview-card">
            <div className="d-flex align-items-center gap-2">
              <div className="flex-shrink-0">
                <div className="avatar-sm">
                  <span className="avatar-title bg-yellow rounded-circle my-0">
                    <i className="bx bx-dollar-circle font-20" />
                  </span>
                </div>
              </div>
              <div className="flex-grow-1">
                <h3 className="text-black  fw-bold my-1">{`$${
                  referrer
                    ? Number(
                        referrer.total_earning - referrer.total_paid_amount
                      ).toFixed(4)
                    : 0
                }`}</h3>
                <h6 className="text-black-50 fw-bold" title="Outstanding">
                  Outstanding
                </h6>
              </div>
            </div>
          </Col>
          <Col className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-xs-12 overview-card">
            <div className="d-flex align-items-center gap-2">
              <div className="flex-shrink-0">
                <div className="avatar-sm">
                  <span className="avatar-title bg-purple rounded-circle my-0">
                    <i className="bx bx-user-check font-20" />
                  </span>
                </div>
              </div>
              <div className="flex-grow-1">
                <h3 className="text-black  fw-bold">
                  {customersCount?.active_customer || 0}
                </h3>

                <h6 className="text-black-50 fw-bold" title="Active Customers">
                  Active Customers
                </h6>
              </div>
            </div>
          </Col>

          <Col className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-xs-12 overview-card">
            <div className="d-flex align-items-center gap-2">
              <div className="flex-shrink-0">
                <div className="avatar-sm">
                  <span className="avatar-title bg-gray rounded-circle my-0">
                    <i className="bx bx-user-x font-20" />
                  </span>
                </div>
              </div>
              <div className="flex-grow-1">
                <h3 className="text-black  fw-bold">
                  {customersCount?.inactive_customer || 0}
                </h3>
                <h6
                  className="text-black-50 fw-bold"
                  title="Inactive Customers">
                  Inactive Customers
                </h6>
              </div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ReferrerAnalyticsCount;
