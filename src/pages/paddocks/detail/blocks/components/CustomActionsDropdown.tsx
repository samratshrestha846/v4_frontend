/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { can } from '../../../../../helpers/checkPermission';
import { CustomDropdownMenuItem } from '../../../../../types/common';
import ActionModal from '../../modals/ActionModal';
import useCustomizedModalFeature from '../hooks/useCustomizedModalFeature';
import { Block } from '../../../../../types/horticulture/block';
import { SubBlock } from '../../../../../types/horticulture/subBlock';

type CustomDropdownProps = {
  menuItems: CustomDropdownMenuItem[];
  title?: string | React.ReactNode;
  containerClass: string;
  icon?: string;
  iconColorClass?: string;
  block?: Block;
  refetchBlocks?: () => void;
  subBlock?: SubBlock;
  refetchSubBlocks?: () => void;
  isBlockMenu?: boolean;
  isSubBlockMenu?: boolean;
};

const CustomActionsDropdown: React.FC<CustomDropdownProps> = ({
  title,
  containerClass,
  icon,
  menuItems,
  iconColorClass,
  block,
  refetchBlocks,
  subBlock,
  refetchSubBlocks,
  isBlockMenu,
  isSubBlockMenu,
}) => {
  const { showModal, toggleModal, modalActionKey, setModalActionKey } =
    useCustomizedModalFeature();

  const checkDependency = (item?: CustomDropdownMenuItem) => {
    if (!item?.isDependedAction) return true;

    if (isBlockMenu) return !!block?.cropable;

    if (isSubBlockMenu) return !!subBlock?.cropable;

    return true;
  };

  return (
    <>
      <div className={classNames(containerClass)}>
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
                  {item.hasDivider && (
                    <Dropdown.Divider as="div" className="m-0" />
                  )}

                  {item.url && item?.permission && can(item.permission) && (
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
                  )}

                  {item.actionKey &&
                    item?.permission &&
                    can(item.permission) &&
                    checkDependency(item) && (
                      <Dropdown.Item
                        onClick={() => {
                          setModalActionKey(item.actionKey);
                          toggleModal();
                        }}
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
                </React.Fragment>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <ActionModal
        showModal={showModal}
        toggleModal={toggleModal}
        refetchBlocks={refetchBlocks}
        block={block}
        action={modalActionKey}
        refetchSubBlocks={refetchSubBlocks}
        subBlock={subBlock}
      />
    </>
  );
};

export default CustomActionsDropdown;
