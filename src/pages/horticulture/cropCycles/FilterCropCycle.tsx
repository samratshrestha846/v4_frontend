/* eslint-disable no-unused-vars */
import React, { FC } from 'react';
import Select from 'react-select';
import { Row, Col } from 'react-bootstrap';
import useCropsDropdown from '../../../hooks/dropdown/useCropsDropdown';
import CustomLoader from '../../../components/CustomLoader';
import ErrorMessage from '../../../components/ErrorMessage';

type Props = {
  crop: any;
  setCrop: (e: any) => void;
};

const FilterCropCycle: FC<Props> = ({ crop, setCrop }) => {
  const {
    data: cropsOption,
    isFetching: isFetchingCrops,
    isError: isErrorCrops,
  } = useCropsDropdown();

  if (isFetchingCrops) return <CustomLoader />;

  if (isErrorCrops) return <ErrorMessage />;

  return (
    <Row>
      <Col xl={4} lg={4} md={4} className="mb-2">
        <Select
          isClearable
          options={cropsOption}
          onChange={(e: any) => setCrop(e ? e.value : '')}
          placeholder="Filter Crop"
          value={cropsOption?.find((item: any) => item.value === crop)}
        />
      </Col>
    </Row>
  );
};

export default FilterCropCycle;
