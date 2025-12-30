/* eslint-disable no-unused-vars */

import React, { useContext } from 'react';
import { AccordionContext, useAccordionButton } from 'react-bootstrap';
import classNames from 'classnames';
import { CustomDropdownMenuItem } from '../../../../../types/common';
import { Block } from '../../../../../types/horticulture/block';
import CustomActionsDropdown from './CustomActionsDropdown';

type CustomToggleProps = {
  eventKey: string;
  containerClass: string;
  linkClass: string;
  item: Block;
  dropdownMenuItems?: CustomDropdownMenuItem[];
  callback?: (eventKey: string) => void;
  refetchBlocks?: () => void;
  toggleAccordion: (toggleKey: string) => void;
};

const CustomToggle: React.FC<CustomToggleProps> = ({
  eventKey,
  containerClass,
  linkClass,
  callback,
  item,
  dropdownMenuItems,
  refetchBlocks,
  toggleAccordion,
}) => {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <div
      className={classNames(
        containerClass,
        isCurrentEventKey
          ? 'accordion-header-active'
          : 'accordion-header-inactive'
      )}>
      <button
        type="button"
        className={classNames(
          'btn btn-link fw-bold font-14 flex-grow-1',
          isCurrentEventKey ? '' : 'text-muted',
          linkClass,
          {
            collapsed: !isCurrentEventKey,
          }
        )}
        onClick={(e) => {
          decoratedOnClick(e);
          toggleAccordion(eventKey);
        }}>
        <i
          className={classNames(
            'me-1',
            isCurrentEventKey ? 'bx bx-chevron-down' : 'bx bx-chevron-right'
          )}
        />
        {item.name}
      </button>

      <div className="d-flex justify-content-end align-items-center gap-1">
        <div
          className={classNames(
            'd-flex align-items-center gap-2 blocks-count',
            isCurrentEventKey ? 'text-white' : 'text-black text-muted'
          )}>
          <p className="m-0 fw-medium font-14"> No. of Sub Blocks</p>
          <span
            className={classNames(
              'circle-count text-black fw-bold',
              isCurrentEventKey ? 'bg-light-gray' : 'bg-white'
            )}>
            {item.sub_blocks_count || 0}
          </span>
        </div>
        {isCurrentEventKey &&
          dropdownMenuItems &&
          dropdownMenuItems.length > 0 && (
            <CustomActionsDropdown
              icon="bx bx-dots-vertical-rounded"
              iconColorClass={isCurrentEventKey ? 'text-white' : 'text-gray'}
              containerClass="custom-action-dropdown d-flex align-items-center justify-content-between text-white"
              menuItems={dropdownMenuItems}
              block={item}
              refetchBlocks={refetchBlocks}
              isBlockMenu
            />
          )}
      </div>
    </div>
  );
};

export default CustomToggle;
