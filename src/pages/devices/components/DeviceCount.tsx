import React from 'react';
import { Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import classNames from 'classnames';
import useFetchDeviceCount from '../hooks/useFetchDeviceCount';
import CustomLoader from '../../../components/CustomLoader';
import { stockTypes } from '../../../constants/stockTypes';
import ErrorMessage from '../../../components/ErrorMessage';

const DeviceCount: React.FC = () => {
  const { data, isFetching, isError } = useFetchDeviceCount();

  const totalDeviceCount = data?.body.reduce(
    (sum, item) => sum + item.device_count,
    0
  );

  if (isFetching) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <Row>
      <Col>
        <div className="d-flex justify-content-between col-gap-2 flex-wrap device-count-wrapper">
          <div className="d-flex jsutify-content-start align-items-center gap-2 mb-2 total-device-count">
            <div>
              <div className="avatar-sm-semi">
                <span className="avatar-title bg-skyBlue rounded-circle my-0">
                  <i className="bx bx-card font-12" />
                </span>
              </div>
            </div>
            <div>
              <h4 className="text-dark m-1">{totalDeviceCount}</h4>
              <p className="m-0 font-12 fw-semibold text-dark text-nowrap">
                Total Devices
              </p>
            </div>
          </div>

          <div className="d-flex justify-content-center align-items-center flex-wrap stock-type-count-wrapper mb-2 flex-grow-1 gap-1">
            {data?.body.map(
              (item) =>
                item.stock_type && (
                  <div
                    className="stock-type-count-item"
                    key={item.stock_type_id}>
                    <h4 className="text-dark m-1">{item.device_count}</h4>
                    <p
                      className={classNames(
                        'm-0 font-12 fw-semibold text-nowrap',
                        Object.keys(stockTypes).includes(item.stock_type.slug)
                          ? stockTypes[item.stock_type.slug].styleTextClass
                          : 'text-dark'
                      )}>
                      {item.stock_type.name.length > 12 ? (
                        <OverlayTrigger
                          placement="bottom"
                          overlay={
                            <Tooltip id={`tooltip-${item.stock_type.name}`}>
                              {item.stock_type.name}
                            </Tooltip>
                          }>
                          <span>
                            {item.stock_type.name.length > 12
                              ? `${item.stock_type.name.slice(0, 12)}...`
                              : item.stock_type.name}
                          </span>
                        </OverlayTrigger>
                      ) : (
                        item.stock_type.name
                      )}
                    </p>
                  </div>
                )
            )}
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default DeviceCount;
