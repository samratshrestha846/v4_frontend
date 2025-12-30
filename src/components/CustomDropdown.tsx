/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { can } from '../helpers/checkPermission';
import { CustomDropdownMenuItem } from '../types/common';

type CustomDropdownProps = {
  menuItems: CustomDropdownMenuItem[];
  title?: string | React.ReactNode;
  containerClass: string;
  icon?: string;
  iconColorClass?: string;
};

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  title,
  containerClass,
  icon,
  menuItems,
  iconColorClass,
}) => {
  return (
    <div className={classNames('custom-dropdown ', containerClass)}>
      <Dropdown>
        <Dropdown.Toggle
          as={Link}
          to=""
          className="arrow-none card-drop d-flex justify-content-center align-items-center">
          <i
            className={classNames(
              iconColorClass || 'text-black',
              icon || 'bx bx-dots-vertical-rounded'
            )}
          />
        </Dropdown.Toggle>
        <Dropdown.Menu align="end" className="p-0">
          {title && (
            <div className="dropdown-header">
              {typeof title === 'string' ? (
                <h6 className="text-overflow m-0">{title}</h6>
              ) : (
                title
              )}
            </div>
          )}
          {(menuItems || []).map((item, index) => {
            return (
              <React.Fragment key={index.toString()}>
                {item.hasDivider && <Dropdown.Divider as="div" />}

                {item.url && item?.permission && can(item.permission) ? (
                  <Dropdown.Item href={item.url}>
                    <div className="d-flex justify-content-start align-items-center">
                      {item.icon && (
                        <i
                          className={classNames(
                            item.variant ? item.variant : '',
                            item.icon,
                            'me-1'
                          )}
                        />
                      )}
                      <span>{item.label}</span>
                    </div>
                  </Dropdown.Item>
                ) : (
                  <Dropdown.Item>
                    <div className="d-flex justify-content-start align-items-center">
                      {item.icon && (
                        <i
                          className={classNames(
                            item.variant ? item.variant : '',
                            item.icon,
                            'me-1'
                          )}
                        />
                      )}
                      <span>{item.label}</span>
                    </div>
                  </Dropdown.Item>
                )}
              </React.Fragment>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default CustomDropdown;
