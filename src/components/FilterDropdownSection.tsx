import React from 'react';
import { Button, Col, Dropdown } from 'react-bootstrap';
import useWindowSizeTracker from '../hooks/common/useWindowSizeTracker';
import FilterDropdown from './FilterDropdown';
import { DropdownFilterItem } from '../types/common';
import { SCREEN_SIZE_MD, SCREEN_SIZE_SM } from '../constants/breakpoints';

type Props = {
  filterFields: DropdownFilterItem[];
  checkNoData: boolean;
  clearAll: () => void;
};

const FilterDropdownSection: React.FC<Props> = ({
  filterFields,
  checkNoData,
  clearAll,
}) => {
  // track window size
  const { windowSize } = useWindowSizeTracker();

  // Responsive cut off i.e. how many filters to show by default based on screen size
  const responsiveCutOff = windowSize.width >= SCREEN_SIZE_SM ? 2 : 1;

  // count selected filters
  const selectedFiltersCount =
    Number(
      filterFields
        ?.slice(responsiveCutOff)
        ?.filter((item) => item.data && !Array.isArray(item.data))?.length
    ) +
    Number(
      filterFields
        ?.slice(responsiveCutOff)
        ?.filter((item) => Array.isArray(item.data) && item.data.length > 0)
        .reduce((acc, element) => acc + element.data.length, 0)
    );

  return (
    <div className="d-flex justify-content-start align-items-center gap-1 flex-wrap">
      {(filterFields?.length <= 2 || windowSize.width > SCREEN_SIZE_MD) &&
        filterFields?.map((item, key) => (
          <FilterDropdown
            key={key}
            filterType={item.filterType}
            setFilterData={item.setFilterData}
            dataOptions={item.dataOptions}
            isMulti={item.isMulti ?? false}
            data={item.data}
            isDateField={item?.isDateField ?? false}
          />
        ))}

      {filterFields?.length > 2 && windowSize.width <= SCREEN_SIZE_MD && (
        <>
          {filterFields
            ?.slice(0, responsiveCutOff)
            ?.map((item, key) => (
              <FilterDropdown
                key={key}
                filterType={item.filterType}
                setFilterData={item.setFilterData}
                dataOptions={item.dataOptions}
                isMulti={item.isMulti ?? false}
                data={item.data}
                isDateField={item?.isDateField ?? false}
              />
            ))}

          <div className="filter-wrapper">
            <Dropdown>
              <Dropdown.Toggle className="filter-toggle" variant="link">
                More Filters
                {selectedFiltersCount > 0 && (
                  <span className="ms-1 badge bg-info rounded-pill text-light">
                    {selectedFiltersCount}
                  </span>
                )}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {filterFields
                  ?.slice(responsiveCutOff)
                  ?.map((item: any, key) => (
                    <FilterDropdown
                      key={key}
                      filterType={item.filterType}
                      setFilterData={item.setFilterData}
                      dataOptions={item.dataOptions}
                      isMulti={item.isMulti ?? false}
                      data={item.data}
                      isDateField={item?.isDateField ?? false}
                      menuDrop="end"
                    />
                  ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </>
      )}

      {!checkNoData && (
        <Col className="col-auto d-flex justify-content-center align-items-center">
          <Button
            variant="link"
            className="font-10 fw-bold clear-filter-btn"
            onClick={clearAll}>
            Clear Filter
          </Button>
        </Col>
      )}
    </div>
  );
};

export default FilterDropdownSection;
