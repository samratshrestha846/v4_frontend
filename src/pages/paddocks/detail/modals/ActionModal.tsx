import React from 'react';
import { Modal } from 'react-bootstrap';
import UpdateBlock from '../blocks/UpdateBlock';
import { Block } from '../../../../types/horticulture/block';
import {
  ACTION_ADD_SUB_BLOCK,
  ACTION_ASSIGN_CROP_TO_BLOCK,
  ACTION_ASSIGN_CROP_TO_SUB_BLOCK,
  ACTION_DELETE_BLOCK,
  ACTION_EDIT_BLOCK,
  ACTION_EDIT_SUB_BLOCK,
  ACTION_BLOCK_PLANTATION_HISTORY,
  ACTION_SUB_BLOCK_PLANTATION_HISTORY,
  ACTION_EDIT_CROP_ASSIGNED_TO_BLOCK,
  ACTION_EDIT_CROP_ASSIGNED_TO_SUB_BLOCK,
  ACTION_DELETE_CROP_ASSIGNED_TO_BLOCK,
  ACTION_DELETE_CROP_ASSIGNED_TO_SUB_BLOCK,
} from '../constants/actionConstants';
import { capitalizeWordFirstLetter } from '../../../../helpers';
import AddSubBlock from '../subBlocks/AddSubBlock';
import AssignCropToBlock from '../blocks/plantationHistory/AssignCropToBlock';
import ListBlockPlantationHistory from '../blocks/plantationHistory/ListBlockPlantationHistory';
import DeleteBlock from '../blocks/DeleteBlock';
import UpdateSubBlock from '../subBlocks/UpdateSubBlock';
import { SubBlock } from '../../../../types/horticulture/subBlock';
import AssignCropToSubBlock from '../subBlocks/plantationHistory/AssignCropToSubBlock';
import ListSubBlockPlantationHistory from '../subBlocks/plantationHistory/ListSubBlockPlantationHistory';
import EditCropAssignedToBlock from '../blocks/plantationHistory/EditCropAssignedToBlock';
import EditCropAssignedToSubBlock from '../subBlocks/plantationHistory/EditCropAssignedToSubBlock';
import DeleteCropable from '../cropables/DeleteCropable';
import CustomModalHeader from '../../../../components/modal/CustomModalHeader';

type Props = {
  showModal: boolean;
  toggleModal: () => void;
  refetchBlocks?: () => void;
  action?: string;
  block?: Block;
  subBlock?: SubBlock;
  refetchSubBlocks?: () => void;
};

const ActionModal: React.FC<Props> = ({
  showModal,
  toggleModal,
  refetchBlocks,
  action,
  block,
  subBlock,
  refetchSubBlocks,
}) => {
  const getModalContentByAction = (actionKey?: string) => {
    if (actionKey) {
      switch (actionKey) {
        case ACTION_EDIT_BLOCK:
          return (
            <UpdateBlock
              toggleModal={toggleModal}
              refetchBlocks={refetchBlocks}
              blockDetail={block}
            />
          );

        case ACTION_ADD_SUB_BLOCK:
          return (
            <AddSubBlock
              toggleModal={toggleModal}
              refetchBlocks={refetchBlocks}
              blockDetail={block}
            />
          );

        case ACTION_DELETE_BLOCK:
          return (
            <DeleteBlock
              toggleModal={toggleModal}
              refetchBlocks={refetchBlocks}
              blockDetail={block}
            />
          );

        case ACTION_ASSIGN_CROP_TO_BLOCK:
          return (
            <AssignCropToBlock
              toggleModal={toggleModal}
              refetchBlocks={refetchBlocks}
              blockDetail={block}
            />
          );

        case ACTION_EDIT_CROP_ASSIGNED_TO_BLOCK:
          return (
            <EditCropAssignedToBlock
              toggleModal={toggleModal}
              refetchBlocks={refetchBlocks}
              cropableDetail={block?.cropable}
            />
          );

        case ACTION_DELETE_CROP_ASSIGNED_TO_BLOCK:
          return (
            <DeleteCropable
              cropableDetail={block?.cropable}
              toggleModal={toggleModal}
              refetchBlocks={refetchBlocks}
            />
          );

        case ACTION_BLOCK_PLANTATION_HISTORY:
          return <ListBlockPlantationHistory blockDetail={block} />;

        case ACTION_EDIT_SUB_BLOCK:
          return (
            <UpdateSubBlock
              subBlockDetail={subBlock}
              toggleModal={toggleModal}
              refetchSubBlocks={refetchSubBlocks}
            />
          );

        case ACTION_SUB_BLOCK_PLANTATION_HISTORY:
          return <ListSubBlockPlantationHistory subBlockDetail={subBlock} />;

        case ACTION_ASSIGN_CROP_TO_SUB_BLOCK:
          return (
            <AssignCropToSubBlock
              subBlockDetail={subBlock}
              toggleModal={toggleModal}
              refetchSubBlocks={refetchSubBlocks}
            />
          );

        case ACTION_EDIT_CROP_ASSIGNED_TO_SUB_BLOCK:
          return (
            <EditCropAssignedToSubBlock
              cropableDetail={subBlock?.cropable}
              toggleModal={toggleModal}
              refetchSubBlocks={refetchSubBlocks}
            />
          );

        case ACTION_DELETE_CROP_ASSIGNED_TO_SUB_BLOCK:
          return (
            <DeleteCropable
              cropableDetail={subBlock?.cropable}
              toggleModal={toggleModal}
              refetchSubBlocks={refetchSubBlocks}
            />
          );

        default:
          return null;
      }
    }

    return null;
  };
  return (
    <Modal
      show={showModal}
      onHide={toggleModal}
      backdrop="static"
      keyboard={false}
      dialogClassName="custom-modal">
      <Modal.Header>
        <CustomModalHeader
          title={capitalizeWordFirstLetter(action, '_') || 'Modal Title'}
          handleModalClose={toggleModal}
        />
      </Modal.Header>
      <Modal.Body>{getModalContentByAction(action)}</Modal.Body>
    </Modal>
  );
};

export default ActionModal;
