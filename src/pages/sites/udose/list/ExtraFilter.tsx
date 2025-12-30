/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Button, ListGroup } from 'react-bootstrap';

type Props = {
  dropdownOpen: boolean;
  toggleDropdown: () => void;
  extraFilters: any[];
  handleFilterApply: () => void;
  handleCheckBoxChange: (e: any, columnKey: string) => void;
};
const ExtraFilter: FC<Props> = ({
  dropdownOpen,
  toggleDropdown,
  extraFilters,
  handleFilterApply,
  handleCheckBoxChange,
}) => {
  return (
    <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
      <Dropdown.Toggle
        variant="link"
        id="dropdown-notification"
        as={Link}
        to="#"
        onClick={toggleDropdown}
        className="nav-link dropdown-toggle arrow-none p-0">
        <Button variant="outline" className="btn btn-outline-secondary btn-sm">
          <i className="bx bx-filter" /> Filter
        </Button>
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu dropdown-menu-animated dropdown-lg max-h-400 overflow-auto">
        <div className="m-2">
          <div className="dropdown-item noti-title">
            <h5 className="m-0">
              <span
                className="float-end close-filter"
                tabIndex={0}
                role="menu"
                onClick={toggleDropdown}>
                <i className="bx bx-x" />
              </span>
              Filters
            </h5>
          </div>

          <div className="mb-2">
            <ListGroup>
              {extraFilters?.map((item) => (
                <ListGroup.Item key={item.key}>
                  <div className="fw-bold">{item.title}</div>
                  <div className="d-flex flex-wrap gap-1">
                    {item.filters.map((element: any) => (
                      <div key={element.value} className="filter-checkbox">
                        <input
                          type="checkbox"
                          name={`${item.key}[${element.value}]`}
                          value={element.value}
                          onChange={(e: any) =>
                            handleCheckBoxChange(e, item.key)
                          }
                          checked={element.isSelected}
                        />{' '}
                        {element.label}
                      </div>
                    ))}
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
          <Button
            className="btn btn-sm btn-outline-secondary dropdown-item text-center notify-item notify-all "
            onClick={handleFilterApply}
            role="menu">
            Apply Filter
          </Button>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ExtraFilter;
