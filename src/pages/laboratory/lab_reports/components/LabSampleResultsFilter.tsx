/* eslint-disable no-unused-vars */
import React, { Dispatch, SetStateAction } from 'react';
import Select from 'react-select';
import { Row, Col } from 'react-bootstrap';
import {
  LabelNumericValue,
  LabelNumericValueDropdown,
} from '../../../../types/common';
import TextInput from '../../../../components/Form/TextInput';

type Props = {
  labSampleTypesOptions?: LabelNumericValue[];
  propertiesOptions?: LabelNumericValue[];
  siteDropdownOptions?: LabelNumericValueDropdown[];
  labSampleType?: number;
  setLabSampleType: Dispatch<SetStateAction<number | undefined>>;
  search?: string;
  handleSearchOnChange: (e: any) => void;
  site?: number;
  setSite: Dispatch<SetStateAction<number | undefined>>;
  property?: number;
  setProperty: Dispatch<SetStateAction<number | undefined>>;
};

const LabSampleResultsFilter: React.FC<Props> = ({
  labSampleTypesOptions,
  propertiesOptions,
  siteDropdownOptions,
  labSampleType,
  setLabSampleType,
  search,
  handleSearchOnChange,
  site,
  setSite,
  property,
  setProperty,
}) => {
  return (
    <Row>
      <Col md={3}>
        <Select
          className="mb-2"
          isClearable
          options={labSampleTypesOptions}
          onChange={(selected: LabelNumericValue | null) =>
            setLabSampleType(selected ? selected.value : undefined)
          }
          placeholder="Sample Type"
          value={labSampleTypesOptions?.find(
            (item: LabelNumericValue) => item.value === labSampleType
          )}
        />
      </Col>
      <Col md={3}>
        <Select
          className="mb-2"
          isClearable
          options={propertiesOptions}
          onChange={(selected: LabelNumericValue | null) =>
            setProperty(selected ? selected.value : undefined)
          }
          placeholder="Property"
          value={propertiesOptions?.find(
            (item: LabelNumericValue) => item.value === property
          )}
        />
      </Col>
      <Col md={3}>
        <Select
          className="mb-2"
          isClearable
          options={siteDropdownOptions}
          onChange={(selected: LabelNumericValue | null) =>
            setSite(selected ? selected.value : undefined)
          }
          placeholder="Site"
          value={siteDropdownOptions?.find(
            (item: LabelNumericValue) => item.value === site
          )}
        />
      </Col>

      <Col md={3}>
        <TextInput
          placeholder="Search"
          onChange={handleSearchOnChange}
          defaultValue={search}
        />
      </Col>
    </Row>
  );
};

export default LabSampleResultsFilter;
