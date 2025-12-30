import React, { FC } from 'react';
import { Card, Col, Row, Button, Alert } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import ReactDatePicker from 'react-datepicker';
import useFetchRainfallData from './hooks/useFetchRainfallData';
import CustomLoader from '../../../../../components/CustomLoader';

const Rainfall: FC = () => {
  const {
    data,
    isFetching,
    isError,
    startDate,
    endDate,
    setDateRange,
    handleSubmit,
    chartOptions,
    chartSeries,
    loading,
  } = useFetchRainfallData();

  if (isFetching || loading) {
    return <CustomLoader />;
  }

  if (isError) {
    return (
      <Alert variant="danger" className="mt-3 mb-3">
        <i className="bx bx-error-alt" /> Oops something went wrong! Please try
        again later.
      </Alert>
    );
  }

  return (
    <div>
      <Card className="mt-2">
        <Card.Header>
          <Card.Title>
            <Row className="p-2 mx-1 mb-0">
              <Col md={3} className="mt-1">
                Yesterday: {data?.yesterday || 0} mm
              </Col>
              <Col md={3} className="mt-1">
                This Week: {data?.week || 0} mm
              </Col>
              <Col md={6} className="mt-1">
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
                    <Button
                      type="submit"
                      variant="outline"
                      className="btn btn-sm btn-outline-secondary ms-2">
                      <i className="mdi mdi-autorenew" />
                    </Button>
                  </form>
                </span>
              </Col>
            </Row>
          </Card.Title>
        </Card.Header>
        {/** Display rainfall data in line graph inside card body  */}
        <Card.Body>
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="area"
            className="apex-charts"
            height={400}
          />
        </Card.Body>
        <Card.Footer>
          <small>
            Note:- This page contains data only if there is Rain Gauge installed
            on your udose machine.
          </small>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default Rainfall;
