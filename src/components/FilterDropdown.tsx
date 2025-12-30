import classNames from 'classnames';
import moment from 'moment';
import React, { useState, useEffect, SetStateAction } from 'react';
import { Dropdown } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';

type Props = {
  filterType: string;
  setFilterData: React.Dispatch<SetStateAction<any>>;
  dataOptions: any[];
  isMulti?: boolean;
  data?: any;
  menuDrop?: 'down' | 'up' | 'start' | 'end' | undefined;
  hideSearchField?: boolean;
  isDateField?: boolean;
};

const FilterDropdown: React.FC<Props> = ({
  filterType,
  isDateField,
  setFilterData,
  dataOptions,
  isMulti,
  data,
  menuDrop,
  hideSearchField,
}) => {
  const [dropdownOptions, setDropdownOptions] = useState<Array<any>>([]);
  const [search, setSearch] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<any>(); // Only for multi is false

  const handleSearchOnChange = (e: any) => {
    const { value } = e.target;
    setSearch(value);
    const filteredData = dataOptions?.filter((item: any) => {
      return item.label.toLowerCase().includes(value.toLowerCase());
    });
    setDropdownOptions(filteredData);
  };

  const handleCheckboxChange = (value: any) => {
    const updatedSelectedValues = data.includes(value)
      ? data.filter((v: any) => v !== value)
      : [...data, value];

    setFilterData(updatedSelectedValues);
  };

  const handleSingleSelection = (item: any) => {
    const isSelected = selectedValue?.value === item.value;
    if (isSelected) {
      setSelectedValue(null);
      setFilterData(null);
    } else {
      setSelectedValue(item);
      setFilterData(item.value);
    }
  };

  useEffect(() => {
    setDropdownOptions(dataOptions);
  }, [dataOptions]);

  return (
    <div className="filter-wrapper">
      <Dropdown drop={menuDrop ?? 'down'}>
        <Dropdown.Toggle className="filter-toggle" variant="link">
          {filterType}

          {data !== undefined && data != null && data !== '' && (
            <span className="ms-1 badge bg-info rounded-pill text-light">
              {isMulti ? data.length > 0 && data.length : 1}
            </span>
          )}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {isDateField ? (
            <ReactDatePicker
              selected={data ? new Date(data) : undefined}
              onChange={(val: Date) =>
                setFilterData(
                  val ? moment(val).format('YYYY-MM-DD') : undefined
                )
              }
              className="form-control"
              placeholderText="MM/DD/YYYY"
              dateFormat="dd/MM/yyyy"
              wrapperClassName="px-1"
              maxDate={new Date()}
              onKeyDown={(e) => {
                e.preventDefault();
              }}
              isClearable
            />
          ) : (
            <div>
              {!hideSearchField && (
                <div className="px-1 py-0">
                  <input
                    type="text"
                    className="form-control"
                    id="searchDropdown"
                    placeholder="Search"
                    value={search}
                    onChange={handleSearchOnChange}
                  />
                </div>
              )}

              <Dropdown.Divider />
              <div className="filter-list">
                {dropdownOptions?.length === 0
                  ? !isDateField && (
                      <Dropdown.Item className="text-center">
                        No Data Found
                      </Dropdown.Item>
                    )
                  : dropdownOptions?.map((item: any) =>
                      isMulti ? (
                        <Dropdown.Item
                          key={item.value}
                          onSelect={() => handleCheckboxChange(item)}>
                          <input
                            id={item.filterType}
                            type="checkbox"
                            checked={data.includes(item)}
                            onChange={() => handleCheckboxChange(item)}
                            className="me-1 form-check-input"
                          />
                          {item.label}
                        </Dropdown.Item>
                      ) : (
                        <Dropdown.Item
                          key={item.value}
                          eventKey={item.value?.toString() || ''}
                          onClick={() => handleSingleSelection(item)}
                          className={classNames(
                            'd-flex justify-content-between align-items-center gap-1',
                            data !== undefined &&
                              data != null &&
                              data !== '' &&
                              selectedValue?.value === item.value
                              ? 'bg-pale-gray'
                              : ''
                          )}>
                          {item.label}

                          {data !== undefined &&
                            data != null &&
                            data !== '' &&
                            selectedValue?.value === item.value && (
                              <i className="bx bx-check text-primary-color" />
                            )}
                        </Dropdown.Item>
                      )
                    )}
              </div>
            </div>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default FilterDropdown;
