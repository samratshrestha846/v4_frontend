/* eslint-disable no-unused-vars */
import React, { useMemo } from 'react';
import { Col, Row } from 'react-bootstrap';
import Select from 'react-select';
import { CeresTagAnimalUpdate } from '../../../../types/ceresTag/ceresTag';
import { formattedDatetime, formattedShortDate } from '../../../../helpers';
import { LabelValueDropdown } from '../../../../types/common';
import {
  CERES_TAG_HISTORICAL_DATA_FROM_BEGINNING,
  CERES_TAG_HISTORICAL_DATA_TO_TODAY,
} from '../../../../constants/ceresTagConstants';

type Props = {
  duration?: string;
  handleChangeDuration: (e: any) => void;
  animalUpdates?: CeresTagAnimalUpdate[];
};

const FilterHistoricalObservations: React.FC<Props> = ({
  duration,
  handleChangeDuration,
  animalUpdates,
}) => {
  const options = useMemo(() => {
    const filterOptions: LabelValueDropdown[] = [];
    if (!animalUpdates || animalUpdates.length === 0) {
      return [];
    }
    const animalUpdatesData = animalUpdates.reverse();
    animalUpdatesData.forEach((item, key) => {
      const start =
        key === 0
          ? CERES_TAG_HISTORICAL_DATA_FROM_BEGINNING
          : animalUpdatesData[key - 1].animal_tag_put_on_at;
      const end = item.animal_tag_taken_off_at;

      filterOptions.push({
        label: `From ${key === 0 ? CERES_TAG_HISTORICAL_DATA_FROM_BEGINNING : formattedShortDate(start)} to ${formattedShortDate(end)}`,
        value: `${key === 0 ? CERES_TAG_HISTORICAL_DATA_FROM_BEGINNING : formattedDatetime(start)}-${formattedDatetime(end)}`,
      } as LabelValueDropdown);

      if (key === animalUpdates.length - 1) {
        filterOptions.push({
          label: `From ${formattedShortDate(item.animal_tag_put_on_at)} to ${CERES_TAG_HISTORICAL_DATA_TO_TODAY}`,
          value: `${formattedDatetime(item.animal_tag_put_on_at)}-${CERES_TAG_HISTORICAL_DATA_TO_TODAY}`,
        } as LabelValueDropdown);
      }
    });
    return filterOptions;
  }, [animalUpdates]);

  return (
    <Row className="justify-content-end">
      <Col md={8} />
      <Col md={4}>
        <Select
          name="duration"
          className="mb-2"
          value={options?.find((item) => item.value === duration)}
          options={options}
          onChange={handleChangeDuration}
          defaultValue={options?.find((item) => item.value === duration)}
          isClearable
          placeholder="Filter By Date Range"
        />
      </Col>
    </Row>
  );
};

export default FilterHistoricalObservations;
