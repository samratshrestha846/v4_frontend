import React from 'react';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import Loader from '../../../components/Loader';
import useExportDeviceActivities from './hooks/useExportActivities';

const ExportDeviceActivity = () => {
  const {
    isFetchingInstalledReport,
    isFetchingSwappedReport,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    handleExportNewInstalledDevices,
    handleExportSwappedDevices,
  } = useExportDeviceActivities();

  if (isFetchingInstalledReport || isFetchingSwappedReport) {
    return <Loader />;
  }

  return (
    <Card>
      <Card.Header as="h5" className="text-primary-color">
        Device Installation Activity Report
      </Card.Header>
      <Card.Body>
        <Row>
          <Col sm={6} md={6} className="react-select-form mb-2">
            <Form.Group>
              <Form.Label>Start Date</Form.Label>
              <ReactDatePicker
                dateFormat="dd/MM/yyyy"
                placeholderText="DD/MM/YYYY"
                onChange={(val) => setStartDate(val)}
                selected={startDate}
                className="form-control"
                maxDate={new Date()}
              />
            </Form.Group>
          </Col>
          <Col sm={6} md={6} className="react-select-form mb-2">
            <Form.Group>
              <Form.Label>End Date</Form.Label>
              <ReactDatePicker
                dateFormat="dd/MM/yyyy"
                placeholderText="DD/MM/YYYY"
                onChange={(val) => setEndDate(val)}
                selected={endDate}
                className="form-control"
                maxDate={new Date()}
              />
            </Form.Group>
          </Col>
          <Col md={12} className="d-flex justify-content-end">
            <Button
              variant="secondary"
              className="btn btn-secondary me-2"
              type="button"
              onClick={handleExportNewInstalledDevices}>
              <i className="bx bx-export me-1" />
              Export New Installed
            </Button>
            <Button
              variant="secondary"
              className="btn btn-secondary"
              type="button"
              onClick={handleExportSwappedDevices}>
              <i className="bx bx-export me-1" />
              Export Swapped
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ExportDeviceActivity;
