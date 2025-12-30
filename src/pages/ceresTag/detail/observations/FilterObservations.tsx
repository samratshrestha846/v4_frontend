/* eslint-disable no-unused-vars */
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Select from 'react-select';
import {
  CERES_TAG_DURATION_OPTIONS,
  DURATION_LAST_24_HOURS,
} from '../../../../constants/durationOptions';

type Props = {
  duration: string;
  handleChangeDuration: (e: any) => void;
  handleExportObservations: () => void;
};

const FilterObservations: React.FC<Props> = ({
  duration,
  handleChangeDuration,
  handleExportObservations,
}) => {
  const customSelectStyles = {
    container: (provided: any) => ({
      ...provided,
      minWidth: '15rem',
    }),
  };

  return (
    <Row>
      <Col>
        <div className="d-flex gap-1 justify-content-end align-items-center flex-wrap mb-2">
          <Select
            styles={customSelectStyles}
            name="duration"
            value={CERES_TAG_DURATION_OPTIONS?.find(
              (item) => item.value === duration
            )}
            options={CERES_TAG_DURATION_OPTIONS}
            onChange={handleChangeDuration}
            defaultValue={CERES_TAG_DURATION_OPTIONS.find(
              (item) => item.value === DURATION_LAST_24_HOURS
            )}
          />
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary m-0 btn btn-outline"
            onClick={handleExportObservations}>
            <i className="bx bxs-file-export" /> Export
          </button>
        </div>
      </Col>
    </Row>
  );
};

export default FilterObservations;
