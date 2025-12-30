/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { FC } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import { useTranslation } from 'react-i18next';
import { formattedDate, humanReadableDate } from '../../../../../helpers';
import CustomLoader from '../../../../../components/CustomLoader';
import useFetchAlarmHistory from './hooks/useFetchAlarmHistory';
import ErrorMessage from '../../../../../components/ErrorMessage';

const AlarmHistory: FC = () => {
  const { t } = useTranslation();
  const {
    data: alarms,
    isFetching: isFetchingAlarms,
    isError,
    setDateRange,
    handleSubmit,
    alarmOccurrence,
    getTextFromErrorCode,
    days,
    startDate,
    endDate,
  } = useFetchAlarmHistory();

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <div className="mt-2">
      <Row>
        <Col className="mb-2">
          <span className="float-end">
            <form className="d-flex" onSubmit={handleSubmit}>
              <div className="">
                <ReactDatePicker
                  dateFormat="dd/MM/yyyy"
                  className="form-control block"
                  selectsRange
                  startDate={startDate}
                  endDate={endDate}
                  maxDate={new Date()}
                  placeholderText="Start Date - End Date"
                  onChange={(update) => {
                    setDateRange(update);
                  }}
                  showMonthDropdown
                  useShortMonthInDropdown
                  isClearable
                />
              </div>
              <button type="submit" className="btn btn-sm btn-primary ms-2">
                <i className="mdi mdi-send" />
              </button>
            </form>
          </span>
        </Col>
      </Row>

      {isFetchingAlarms ? (
        <CustomLoader />
      ) : (
        <Row>
          <Col lg={7}>
            <Card>
              <Card.Header
                as="h5"
                className="text-primary-color"
                style={{ backgroundColor: '#FBC1C3' }}>
                Alarm History (<small>Last {days} days</small>){/* </h4> */}
              </Card.Header>
              <Card.Body className="pt-1">
                <div className="table-responsive">
                  <table className="table table-hover table-centered mb-0">
                    <thead>
                      <tr>
                        <th />
                        <th>Alarm Type</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {alarms?.map((alarm) => (
                        <tr key={alarm.id}>
                          <td style={{ width: '20px' }}>
                            <div className="avatar-sm">
                              <span className="avatar-title bg-danger-lighten text-danger rounded">
                                <i className="mdi mdi-alarm-light-outline animate font-24" />
                              </span>
                            </div>
                          </td>
                          <td>
                            {getTextFromErrorCode(
                              alarm.error_code,
                              alarm.setting
                            )}
                          </td>
                          <td>
                            <h5 className="font-15 mb-1 fw-normal">
                              {formattedDate(alarm.message_date)}
                            </h5>
                            <span className="text-muted font-13">
                              {humanReadableDate(alarm.message_date)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={5}>
            <Card>
              <Card.Header
                as="h5"
                className="text-primary-color"
                style={{ backgroundColor: '#FBC1C3' }}>
                Alarm Occurrence <small>(Last {days} days)</small>
              </Card.Header>
              <Card.Body className="pt-1">
                <div className="table-responsive">
                  <table className="table table-hover table-centered mb-0">
                    <thead>
                      <tr>
                        <th />
                        <th>Alarm Type</th>
                        <th>Total Occurence</th>
                      </tr>
                    </thead>
                    <tbody>
                      {alarmOccurrence &&
                        Object.keys(alarmOccurrence).map((errorCode) => (
                          <tr key={errorCode}>
                            <td style={{ width: '20px' }}>
                              <div className="avatar-sm">
                                <span className="avatar-title bg-danger-lighten text-danger rounded">
                                  <i className="mdi mdi-alarm-light-outline animate font-24" />
                                </span>
                              </div>
                            </td>
                            <td>{String(t(`alarmTitle.${errorCode}`))}</td>
                            <td>{alarmOccurrence[errorCode]}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default AlarmHistory;
