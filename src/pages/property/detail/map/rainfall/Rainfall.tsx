import React, { FC, SetStateAction, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Select from 'react-select';
import CustomLoader from '../../../../../components/CustomLoader';

type Props = {
  setDateRange: React.Dispatch<SetStateAction<string>>;
  getDateRange: any;
  rainfallRange: number[];
  isFetchingRainfall: boolean;
  isErrorRainfall: boolean;
  fetchRasterError: boolean;
  fetchingRaster: boolean;
};

const Legend: FC<any> = ({
  rainfallRange,
  isErrorRainfall,
  fetchRasterError,
}) => {
  if (isErrorRainfall || fetchRasterError) {
    return (
      <div className="text-center m-2 text-black-50">No data available</div>
    );
  }

  return (
    <div className="legend-rainfall d-flex gap-1 justify-content-center align-items-center mt-2">
      <div className="d-flex flex-column align-items-center w-100">
        <span className="rainfall-box l1" />

        <div className="d-flex justify-content-between align-items-center w-100">
          <span className="font-8">{rainfallRange[0].toFixed(0)}mm</span>
          <span className="font-8">{rainfallRange[1].toFixed(0)}mm</span>
        </div>
      </div>
    </div>
  );
};

const Rainfall: FC<Props> = ({
  setDateRange,
  getDateRange,
  rainfallRange,
  isFetchingRainfall,
  isErrorRainfall,
  fetchRasterError,
  fetchingRaster,
}) => {
  const [dateValue, setDateValue] = useState<number | null>(1);

  const getDropdownText = (value: number) => {
    const today = new Date();
    const year = today.getFullYear();
    const todayMonth = today.getMonth() + 1;
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    if (todayMonth - value - 1 < 0) {
      const desiredMonth = months[12 + todayMonth - value - 1];
      const desiredYear = year - 1;
      return `${desiredMonth} ${desiredYear}`;
    }
    const desiredMonth = months[todayMonth - value - 1];
    const desiredYear = year;
    return `${desiredMonth} ${desiredYear}`;
  };

  const handleDateChange = (selectedOption: any) => {
    const value = selectedOption?.value;
    setDateValue(value);
    setDateRange(getDateRange(value));
  };

  // Create options for react-select
  const options = [...Array(12).keys()].map((month) => ({
    value: month + 1,
    label: getDropdownText(month + 1),
  }));

  if (isFetchingRainfall || fetchingRaster) {
    return <CustomLoader />;
  }

  return (
    <div className="d-flex flex-column justify-content-center">
      <Select
        id="month"
        value={options.find((option) => option.value === dateValue)}
        onChange={handleDateChange}
        options={options}
        className="mb-3"
        placeholder="Select Month"
      />

      <Row>
        <Col>
          <Legend
            rainfallRange={rainfallRange}
            isErrorRainfall={isErrorRainfall}
            fetchRasterError={fetchRasterError}
            isFetchingRainfall={isFetchingRainfall}
            fetchingRaster={fetchingRaster}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Rainfall;
