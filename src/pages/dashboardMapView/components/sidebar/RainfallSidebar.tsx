import React, { useState, SetStateAction, FC } from 'react';
import Select from 'react-select';
import { Row, Col } from 'react-bootstrap';
import useRainfallDateSelectDropdown from '../../../../hooks/dropdown/useRainfallDateSelectDropdown';
import CustomLoader from '../../../../components/CustomLoader';

type Props = {
  setDateRange: React.Dispatch<SetStateAction<string>>;
  getDateRange: any;
  rainfallRange: any;
  fetchRasterError: boolean;
  fetchingRaster: boolean;
  isFetchingRainfall: boolean;
  isErrorRainfall: boolean;
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

const RainfallSidebar: React.FC<Props> = ({
  setDateRange,
  getDateRange,
  rainfallRange,
  fetchRasterError,
  fetchingRaster,
  isFetchingRainfall,
  isErrorRainfall,
}) => {
  const { options } = useRainfallDateSelectDropdown();

  const [dateValue, setDateValue] = useState<number | null>(1);

  const handleDateChange = (selectedOption: any) => {
    const value = selectedOption?.value;
    setDateValue(value);

    setDateRange(getDateRange(value));
  };

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
        styles={{
          menu: (provided) => ({ ...provided, zIndex: 9999 }),
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
        menuPortalTarget={document.body}
        menuPosition="fixed"
        menuShouldBlockScroll
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

export default RainfallSidebar;
