import React, { SetStateAction } from 'react';
import { can } from '../../../helpers/checkPermission';
import { CREATE_CROP_LIFE_CYCLE } from '../../../constants/permissions';
import { DropdownFilterItem, LabelNumericValue } from '../../../types/common';
import FilterDropdownSection from '../../../components/FilterDropdownSection';
import AddNewRecord from '../../../components/AddNewRecord';
import { CROP_CYCLE_ADD } from '../../../constants/path';

type Props = {
  crop?: number;
  setCrop: React.Dispatch<SetStateAction<number | undefined>>;
  cropsOption: LabelNumericValue[];
};

const FilterCropCycleSection: React.FC<Props> = ({
  crop,
  setCrop,
  cropsOption,
}) => {
  const canCreateCropCycle = can(CREATE_CROP_LIFE_CYCLE);

  const clearAll = () => {
    setCrop(undefined);
  };

  const checkNoData = !crop;

  // Filter Fields
  const filterFields: DropdownFilterItem[] = [
    {
      filterType: 'Crop',
      setFilterData: setCrop,
      dataOptions: cropsOption,
      isMulti: false,
      data: crop,
    },
  ];

  return (
    <div className="d-flex justify-content-between align-items-center gap-1 flex-wrap mb-2">
      <div className="d-flex justify-content-start align-items-center gap-1 flex-wrap">
        <FilterDropdownSection
          filterFields={filterFields}
          checkNoData={checkNoData}
          clearAll={clearAll}
        />
      </div>

      <div className="d-flex justify-content-end align-items-center flex-grow-1 gap-1">
        {canCreateCropCycle && (
          <AddNewRecord url={CROP_CYCLE_ADD} title="Add Crop Cycle" />
        )}
      </div>
    </div>
  );
};

export default FilterCropCycleSection;
