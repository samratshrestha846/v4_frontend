import { useState } from 'react';

const useExtraFilter = ({
  setAppliedFilters,
  extraFilters,
  setExtraFilters,
}: any) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleFilterApply = () => {
    setAppliedFilters(extraFilters);
    toggleDropdown();
  };

  const handleResetAppliedFilters = () => {
    setAppliedFilters([]);
  };

  const handleCheckBoxChange = (e: any, columnKey: string) => {
    let updatedExtraFilters: any[] | undefined = [];
    if (e.target.checked) {
      updatedExtraFilters = extraFilters?.map((column: any) => {
        if (column.key === columnKey) {
          return {
            ...column,
            filters: column.filters.map((filter: any) => {
              if (filter.value === e.target.value) {
                return {
                  ...filter,
                  isSelected: !filter.isSelected,
                };
              }
              return filter;
            }),
          };
        }
        return column;
      });
    } else {
      updatedExtraFilters = extraFilters?.map((column: any) => {
        if (column.key === columnKey) {
          return {
            ...column,
            filters: column.filters.map((filter: any) => {
              if (filter.value === e.target.value) {
                return {
                  ...filter,
                  isSelected: !filter.isSelected,
                };
              }
              return filter;
            }),
          };
        }
        return column;
      });
    }
    setExtraFilters(updatedExtraFilters);
  };

  return {
    dropdownOpen,
    toggleDropdown,
    handleFilterApply,
    handleCheckBoxChange,
    handleResetAppliedFilters,
  };
};

export default useExtraFilter;
