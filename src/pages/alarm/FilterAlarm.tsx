import React, { SetStateAction } from 'react';
import FilterDropdownSection from '../../components/FilterDropdownSection';
import { DropdownFilterItem } from '../../types/common';
import {
  SEVERITY_LEVEL_OPTIONS,
  VISIBILITY_OPTIONS,
} from '../../constants/alarmConstants';
import { STATUS_OPTIONS } from '../../constants/statusOptions';
import AddNewRecord from '../../components/AddNewRecord';
import { ALARM_ADD } from '../../constants/path';
import { can } from '../../helpers/checkPermission';
import { CREATE_ALARM } from '../../constants/permissions';

type Props = {
  severityLevel?: string;
  setSeveritylevel: React.Dispatch<SetStateAction<string | undefined>>;
  status: number | null;
  setStatus: React.Dispatch<SetStateAction<number | null>>;
  visibility?: number | null;
  setVisibility: React.Dispatch<SetStateAction<number | null>>;
};

const FilterAlarm: React.FC<Props> = ({
  severityLevel,
  setSeveritylevel,
  status,
  setStatus,
  visibility,
  setVisibility,
}) => {
  const clearAll = () => {
    setSeveritylevel(undefined);
    setStatus(null);
    setVisibility(null);
  };

  const canCreateAlarm = can(CREATE_ALARM);

  const checkNoData = !(
    severityLevel ||
    (status !== undefined && status !== null) ||
    (visibility !== undefined && visibility !== null)
  );

  // Filter Fields
  const filterFields: DropdownFilterItem[] = [
    {
      filterType: 'Severity Level',
      setFilterData: setSeveritylevel,
      dataOptions: SEVERITY_LEVEL_OPTIONS,
      isMulti: false,
      data: severityLevel,
    },
    {
      filterType: 'Visibility',
      setFilterData: setVisibility,
      dataOptions: VISIBILITY_OPTIONS,
      isMulti: false,
      data: visibility,
    },
    {
      filterType: 'Status',
      setFilterData: setStatus,
      dataOptions: STATUS_OPTIONS,
      isMulti: false,
      data: status,
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
        {canCreateAlarm && <AddNewRecord url={ALARM_ADD} title="Add Alarm" />}
      </div>
    </div>
  );
};

export default FilterAlarm;
