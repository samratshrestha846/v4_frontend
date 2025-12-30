import React, { SetStateAction } from 'react';
import { Dropdown, Form, Button } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';

type ExportDeviceProps = {
  handleExportReport: () => void;
  asOfDate?: Date | null;
  setAsOfDate: React.Dispatch<SetStateAction<Date | null>>;
  setIsToggled: React.Dispatch<SetStateAction<boolean>>;
  isToggled: boolean;
};

const ExportDevice = ({
  asOfDate,
  setAsOfDate,
  handleExportReport,
  setIsToggled,
  isToggled,
}: ExportDeviceProps) => {
  return (
    <Dropdown
      onToggle={() => {
        setIsToggled(!isToggled);
      }}>
      <Dropdown.Toggle
        variant="outline"
        className="btn btn-sm btn-outline-secondary">
        Report
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Form className="p-2">
          <div className="mb-1">
            <Form.Label htmlFor="select date" className="form-label">
              As of Date
            </Form.Label>
            <ReactDatePicker
              placeholderText="DD/MM/YYYY"
              className="form-control"
              onChange={(date) => setAsOfDate(date)}
              selected={asOfDate}
              maxDate={new Date()}
            />
          </div>

          <Button
            variant="info"
            onClick={handleExportReport}
            className="btn btn-info btn-sm m-0">
            <i className="bx bxs-file-export me-1" />
            Export
          </Button>
        </Form>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ExportDevice;
