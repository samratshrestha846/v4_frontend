import React from 'react';
import SubBlockInfo from './components/SubBlockInfo';
import { SubBlock } from '../../../../types/horticulture/subBlock';
import { CustomDropdownMenuItem } from '../../../../types/common';
import {
  ACTION_ASSIGN_CROP_TO_SUB_BLOCK,
  ACTION_DELETE_CROP_ASSIGNED_TO_SUB_BLOCK,
  ACTION_EDIT_CROP_ASSIGNED_TO_SUB_BLOCK,
  ACTION_EDIT_SUB_BLOCK,
  ACTION_SUB_BLOCK_PLANTATION_HISTORY,
} from '../constants/actionConstants';
import {
  CREATE_ASSIGNED_CROP_TO_SUB_BLOCK,
  DELETE_ASSIGNED_CROP_TO_SUB_BLOCK,
  READ_ASSIGNED_CROP_TO_SUB_BLOCK,
  UPDATE_SUB_BLOCK,
} from '../../../../constants/permissions';

type Props = {
  subBlocks?: SubBlock[];
  refetchSubBlocks?: () => void;
};

const ListSubBlocks: React.FC<Props> = ({ subBlocks, refetchSubBlocks }) => {
  const actionMenuItems: CustomDropdownMenuItem[] = [
    {
      label: 'Edit Sub Block',
      icon: 'bx bx-edit',
      actionKey: ACTION_EDIT_SUB_BLOCK,
      permission: UPDATE_SUB_BLOCK,
    },

    {
      label: 'Assign Crop',
      icon: 'bx bx-leaf',
      hasDivider: true,
      actionKey: ACTION_ASSIGN_CROP_TO_SUB_BLOCK,
      permission: CREATE_ASSIGNED_CROP_TO_SUB_BLOCK,
    },
    {
      label: 'Edit Assigned Crop',
      icon: 'bx bx-edit',
      actionKey: ACTION_EDIT_CROP_ASSIGNED_TO_SUB_BLOCK,
      permission: CREATE_ASSIGNED_CROP_TO_SUB_BLOCK,
      isDependedAction: true,
    },
    {
      label: 'Delete Assigned Crop',
      icon: 'bx bx-trash',
      actionKey: ACTION_DELETE_CROP_ASSIGNED_TO_SUB_BLOCK,
      permission: DELETE_ASSIGNED_CROP_TO_SUB_BLOCK,
      isDependedAction: true,
    },
    {
      label: 'Plantation History',
      icon: 'bx bx-notepad',
      actionKey: ACTION_SUB_BLOCK_PLANTATION_HISTORY,
      permission: READ_ASSIGNED_CROP_TO_SUB_BLOCK,
    },
  ];

  return (
    <div className="list-sub-blocks">
      {subBlocks &&
        subBlocks?.length > 0 &&
        subBlocks?.map((item) => (
          <SubBlockInfo
            key={item.id}
            subBlock={item}
            refetchSubBlocks={refetchSubBlocks}
            actionMenuItems={actionMenuItems}
          />
        ))}
    </div>
  );
};

export default ListSubBlocks;
