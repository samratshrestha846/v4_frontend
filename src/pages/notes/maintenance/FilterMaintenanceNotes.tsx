import React, { SetStateAction } from 'react';
import FilterDropdownSection from '../../../components/FilterDropdownSection';
import { DropdownFilterItem } from '../../../types/common';
import usePropertiesDropdown from '../../../hooks/dropdown/usePropertiesDropdown';
import useDevicesDropdown from '../../../hooks/dropdown/useDevicesDropdown';
import useDitUsersDropdown from '../../../hooks/dropdown/useDitUsersDropdown';
import DURATION_OPTIONS from '../../../constants/durationOptions';

type Props = {
  duration?: string;
  setDuration: React.Dispatch<SetStateAction<string | undefined>>;
  property?: number;
  setProperty: React.Dispatch<SetStateAction<number | undefined>>;
  serialNumber?: number;
  setSerialNumber: React.Dispatch<SetStateAction<number | undefined>>;
  performer?: number;
  setPerformer: React.Dispatch<SetStateAction<number | undefined>>;
};

const FilterMaintenanceNotes: React.FC<Props> = ({
  duration,
  setDuration,
  setProperty,
  property,
  serialNumber,
  setSerialNumber,
  performer,
  setPerformer,
}) => {
  const { data: propertiesOptions } = usePropertiesDropdown();
  const { data: devicesOptions } = useDevicesDropdown({});
  const { data: performersOptions } = useDitUsersDropdown();

  const clearAll = () => {
    setDuration(undefined);
    setProperty(undefined);
    setSerialNumber(undefined);
    setPerformer(undefined);
  };

  const checkNoData = !(duration || property || serialNumber || performer);

  // Filter Fields
  const filterFields: DropdownFilterItem[] = [
    {
      filterType: 'Property',
      setFilterData: setProperty,
      dataOptions: propertiesOptions,
      isMulti: false,
      data: property,
    },
    {
      filterType: 'Device Serial No.',
      setFilterData: setSerialNumber,
      dataOptions: devicesOptions,
      isMulti: false,
      data: serialNumber,
    },
    {
      filterType: 'Note Taker',
      setFilterData: setPerformer,
      dataOptions: performersOptions,
      isMulti: false,
      data: performer,
    },
    {
      filterType: 'Duration',
      setFilterData: setDuration,
      dataOptions: DURATION_OPTIONS,
      isMulti: false,
      data: duration,
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
    </div>
  );
};

export default FilterMaintenanceNotes;
