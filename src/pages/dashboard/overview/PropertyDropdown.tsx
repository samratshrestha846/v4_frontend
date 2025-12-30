import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useFetchPropertyDropdown from '../../common/hooks/useFetchPropertyDropdown';
import { PropertyDropdownOption } from '../../../types/common';
import { prepareDynamicUrl } from '../../../helpers';
import { PROPERTY_VIEW } from '../../../constants/path';

const PropertyDropdown = () => {
  const [propertyDropdownOptions, setPropertyDropdownOptions] = useState<
    Array<PropertyDropdownOption>
  >([]);
  const [search, setSearch] = useState<string>('');

  const navigate = useNavigate();

  const { propertyDropdowns } = useFetchPropertyDropdown();

  useEffect(() => {
    setPropertyDropdownOptions(propertyDropdowns);
  }, [propertyDropdowns]);

  const handleSearchOnChange = (e: any) => {
    const { value } = e.target;
    setSearch(value);
    const filteredData = propertyDropdowns?.filter((item) => {
      return item.name.toLowerCase().includes(value.toLowerCase());
    });
    setPropertyDropdownOptions(filteredData);
  };

  const handleDropdownItemOnClick = (id: number) => {
    navigate(prepareDynamicUrl(PROPERTY_VIEW, id));
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="outline pt-0 pb-1 px-0">
        <h6
          className="text-black-50 fw-bold p-0 m-0 downArrow"
          title="Total Properties">
          Properties
        </h6>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <div className="px-1 py-0">
          <input
            type="text"
            className="form-control"
            id="searchPropertyDropdown"
            placeholder="Search"
            value={search}
            onChange={handleSearchOnChange}
          />
        </div>

        <Dropdown.Divider />
        <div className="list">
          {(propertyDropdownOptions?.length === 0 && (
            <Dropdown.Item className="text-center">No Data Found</Dropdown.Item>
          )) ||
            propertyDropdownOptions?.map((item) => (
              <Dropdown.Item
                key={item.id}
                eventKey={item.id.toString()}
                onClick={() => handleDropdownItemOnClick(item.id)}>
                {item.name}
              </Dropdown.Item>
            ))}
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default PropertyDropdown;
