/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import classNames from 'classnames';
import { can } from '../helpers/checkPermission';
import { CustomDropdownMenuItem } from '../types/common';
import useModalActionFeature from '../hooks/common/useModalActionFeature';
import ActionModal from './ActionModal';

type CustomDropdownProps = {
  menuItems: CustomDropdownMenuItem[];
  title?: string | React.ReactNode;
  containerClass: string;
  icon?: string;
  iconColorClass?: string;
  id?: number;
  refetch?: () => void;
  size?: 'lg' | 'sm' | 'xl';
  children?: React.ReactNode;
  toggleBtnClass?: string;
  dropdownMenuclass?: string;
};

const ActionDropdown: React.FC<CustomDropdownProps> = ({
  title,
  containerClass,
  icon,
  menuItems,
  iconColorClass,
  id,
  refetch,
  size,
  children,
  toggleBtnClass,
  dropdownMenuclass,
}) => {
  const navigate = useNavigate();

  const location = useLocation();
  const currentQueryParams = location.search;

  const permissionList: string[] = menuItems
    .filter((item) => item.permission && typeof item.permission === 'string')
    .map((item) => item.permission as string);

  const {
    showModal,
    toggleModal,
    modalActionKey,
    setModalActionKey,
    modalContent,
    setModalContent,
  } = useModalActionFeature();

  const checkDependency = (item?: CustomDropdownMenuItem) => {
    if (!item?.isDependedAction) return true;

    if (id) return !!id;

    return true;
  };

  const handleModalAction = (item: CustomDropdownMenuItem) => {
    toggleModal();
    setModalActionKey(item.actionKey);
    const modifiedModalContent = React.cloneElement(item.modalContent, {
      toggleModal,
      refetch,
    });
    setModalContent(modifiedModalContent);
  };
  const handleNavigation = (url?: string) => {
    navigate(url!, {
      state: { from: window.location.pathname + window.location.search },
    });
  };
  return can(permissionList) ? (
    <>
      <div className={classNames(containerClass)}>
        <Dropdown>
          <Dropdown.Toggle
            as={Link}
            to={`${location.pathname}${currentQueryParams}`}
            variant="outline"
            className={toggleBtnClass ?? 'border-0'}>
            <i
              className={classNames(
                iconColorClass ?? 'text-soft-gray',
                icon ?? 'bx bx-dots-vertical-rounded'
              )}
            />
          </Dropdown.Toggle>

          <Dropdown.Menu
            align="end"
            className={classNames(
              'p-0 dropdown-menu-animated',
              dropdownMenuclass ?? ''
            )}>
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
                  {item.hasDivider && (
                    <Dropdown.Divider as="div" className="m-0" />
                  )}
                  {/* For URL based action */}
                  {item.url && item?.permission && can(item.permission) && (
                    <Dropdown.Item
                      as="button"
                      onClick={() => handleNavigation(item.url)}>
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
                  {/* For modal based action */}
                  {item.actionKey &&
                    item?.permission &&
                    can(item.permission) &&
                    checkDependency(item) && (
                      <Dropdown.Item
                        onClick={() => handleModalAction(item)}
                        as="button">
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

                  {/* action method used for downloading */}
                  {item?.actionMethod &&
                    item?.permission &&
                    can(item.permission) && (
                      <Dropdown.Item onClick={item.actionMethod} as="button">
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
            {children && <div className="dropdown-item">{children}</div>}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <ActionModal
        showModal={showModal}
        toggleModal={toggleModal}
        component={modalContent}
        action={modalActionKey}
        size={size}
      />
    </>
  ) : null;
};

export default ActionDropdown;
