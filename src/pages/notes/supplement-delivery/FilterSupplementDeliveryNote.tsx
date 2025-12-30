import React, { SetStateAction } from 'react';
import FilterDropdownSection from '../../../components/FilterDropdownSection';
import { DropdownFilterItem } from '../../../types/common';
import usePropertiesDropdown from '../../../hooks/dropdown/usePropertiesDropdown';
import useDitUsersDropdown from '../../../hooks/dropdown/useDitUsersDropdown';
import DURATION_OPTIONS from '../../../constants/durationOptions';

type Props = {
  duration?: string;
  setDuration: React.Dispatch<SetStateAction<string | undefined>>;
  customerPropertyId?: number;
  setCustomerPropertyId: React.Dispatch<SetStateAction<number | undefined>>;
  performerId?: number;
  setPerformerId: React.Dispatch<SetStateAction<number | undefined>>;
};

const FilterSupplementDeliveryNote: React.FC<Props> = ({
  performerId,
  setPerformerId,
  customerPropertyId,
  setCustomerPropertyId,
  duration,
  setDuration,
}) => {
  const { data: propertiesOptions } = usePropertiesDropdown();
  const { data: performersOptions } = useDitUsersDropdown();

  const clearAll = () => {
    setDuration(undefined);
    setCustomerPropertyId(undefined);
    setPerformerId(undefined);
  };

  const checkNoData = !(duration || customerPropertyId || performerId);

  // Filter Fields
  const filterFields: DropdownFilterItem[] = [
    {
      filterType: 'Property',
      setFilterData: setCustomerPropertyId,
      dataOptions: propertiesOptions,
      isMulti: false,
      data: customerPropertyId,
    },

    {
      filterType: 'Note Taker',
      setFilterData: setPerformerId,
      dataOptions: performersOptions,
      isMulti: false,
      data: performerId,
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

export default FilterSupplementDeliveryNote;
