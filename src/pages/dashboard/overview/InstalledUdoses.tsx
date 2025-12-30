import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useFetchUdoseDropdown from '../../common/hooks/useFetchUdoseDropdown';
import { SiteDropdownOptions } from '../../../types/common';
import { prepareDynamicUrl } from '../../../helpers';
import { UDOSE_VIEW } from '../../../constants/path';

const InstalledUdoses = () => {
  const [udoseDropdownOptions, setUdoseDropdownOptions] = useState<
    Array<SiteDropdownOptions>
  >([]);
  const [search, setSearch] = useState('');

  const navigate = useNavigate();

  const { udoseDropdowns } = useFetchUdoseDropdown();

  useEffect(() => {
    setUdoseDropdownOptions(udoseDropdowns);
  }, [udoseDropdowns]);

  const handleSearchOnChange = (e: any) => {
    const { value } = e.target;
    setSearch(value);
    const filteredData = udoseDropdowns.filter((item) => {
      return item.name.toLowerCase().includes(value.toLowerCase());
    });
    setUdoseDropdownOptions(filteredData);
  };

  const handleDropdownItemOnClick = (id: number) => {
    navigate(prepareDynamicUrl(UDOSE_VIEW, id));
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="outline pt-0 pb-1 px-0">
        <h6
          className="text-black-50 fw-bold p-0 m-0 downArrow"
          title="Total uDOSEs">
          Installed uDOSEs
        </h6>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <div className="px-1 py-0">
          <input
            type="text"
            className="form-control"
            id="searchUdoseDropdown"
            placeholder="Search"
            value={search}
            onChange={handleSearchOnChange}
          />
        </div>

        <Dropdown.Divider />
        <div className="list">
          {(udoseDropdownOptions?.length === 0 && (
            <Dropdown.Item className="text-center">No Data Found</Dropdown.Item>
          )) ||
            udoseDropdownOptions?.map((item) => (
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

export default InstalledUdoses;
