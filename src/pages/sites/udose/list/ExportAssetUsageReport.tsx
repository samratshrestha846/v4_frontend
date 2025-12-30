import React from 'react';
import { Dropdown, Form, Button } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import moment from 'moment';
import useExportAssetUsage from '../hooks/useExportAssetUsage';

const ExportAssetUsageReport: React.FC = () => {
  const { handleExportReport, handleDateChange, selectedDate } =
    useExportAssetUsage();
  return (
    <Dropdown>
      <Dropdown.Toggle
        as="button"
        className="dropdown-item bg-transparent border-0 p-0"
        size="sm">
        <i className="bx bxs-file-export me-1" />
        <span>Asset Usage Report</span>
      </Dropdown.Toggle>
      <Dropdown.Menu
        style={{ minWidth: '14rem' }}
        className="dropdown-menu-animated">
        <Form className="p-2">
          <Form.Group className="mb-2">
            <Form.Label>Select Month</Form.Label>
            <ReactDatePicker
              selected={selectedDate}
              className="form-control block"
              maxDate={moment().toDate()}
              placeholderText="Select Date"
              showMonthYearPicker
              dateFormat="MM/yyyy"
              onChange={handleDateChange}
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button
              variant="info"
              className="btn btn-info btn-sm"
              onClick={handleExportReport}>
              <i className="bx bx-export me-1" />
              <span>Export</span>
            </Button>
          </div>
        </Form>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ExportAssetUsageReport;
