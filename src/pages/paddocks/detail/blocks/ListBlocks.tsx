/* eslint-disable react/no-array-index-key */
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Accordion, Button, Card, Col, Row } from 'react-bootstrap';
import useListBlocksByPaddock from './hooks/useListBlocksByPaddock';
import CustomLoader from '../../../../components/CustomLoader';
import ErrorMessage from '../../../../components/ErrorMessage';
import { CustomDropdownMenuItem } from '../../../../types/common';
import CustomToggle from './components/CustomToggle';
import { can } from '../../../../helpers/checkPermission';
import {
  READ_ASSIGNED_CROP_TO_BLOCK,
  CREATE_ASSIGNED_CROP_TO_BLOCK,
  CREATE_BLOCK,
  CREATE_SUB_BLOCK,
  UPDATE_BLOCK,
  DELETE_BLOCK,
  UPDATE_ASSIGNED_CROP_TO_BLOCK,
  DELETE_ASSIGNED_CROP_TO_BLOCK,
} from '../../../../constants/permissions';
import useModalFeature from '../../../../hooks/common/useModalFeature';
import AddBlockModal from './modals/AddBlockModal';
import {
  ACTION_ADD_SUB_BLOCK,
  ACTION_ASSIGN_CROP_TO_BLOCK,
  ACTION_DELETE_BLOCK,
  ACTION_EDIT_BLOCK,
  ACTION_BLOCK_PLANTATION_HISTORY,
  ACTION_EDIT_CROP_ASSIGNED_TO_BLOCK,
  ACTION_DELETE_CROP_ASSIGNED_TO_BLOCK,
} from '../constants/actionConstants';
import BlockContent from './components/BlockContent';
import NoDataAvailable from '../../../../components/NoDataAvailable';

type Props = {
  setNumberOfBlocks: Dispatch<SetStateAction<number>>;
};

const ListBlocks: React.FC<Props> = ({ setNumberOfBlocks }) => {
  const { id } = useParams();
  const canCreateBlock = can(CREATE_BLOCK);

  const { showModal, toggleModal } = useModalFeature();

  const [activeEventKey, setActiveEventKey] = useState<string | null>('0');

  const toggleAccordion = (activeKey: string | null) => {
    setActiveEventKey(activeKey);
  };

  const {
    data,
    isFetching,
    isError,
    refetch: refetchBlocks,
  } = useListBlocksByPaddock(Number(id));

  useEffect(() => {
    if (data) {
      setNumberOfBlocks(data.length);
    }
  }, [data]);

  if (isFetching) {
    return <CustomLoader />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  const menuItems: CustomDropdownMenuItem[] = [
    {
      label: 'Add Sub Block',
      icon: 'bx bx-plus',
      actionKey: ACTION_ADD_SUB_BLOCK,
      permission: CREATE_SUB_BLOCK,
    },
    {
      label: 'Edit Block',
      icon: 'bx bx-edit',
      hasDivider: true,
      actionKey: ACTION_EDIT_BLOCK,
      permission: UPDATE_BLOCK,
    },
    {
      label: 'Delete Block',
      icon: 'bx bx-trash',
      actionKey: ACTION_DELETE_BLOCK,
      permission: DELETE_BLOCK,
    },
    {
      label: 'Assign Crop',
      icon: 'bx bx-leaf',
      hasDivider: true,
      actionKey: ACTION_ASSIGN_CROP_TO_BLOCK,
      permission: CREATE_ASSIGNED_CROP_TO_BLOCK,
    },
    {
      label: 'Edit Assigned Crop',
      icon: 'bx bx-edit',
      actionKey: ACTION_EDIT_CROP_ASSIGNED_TO_BLOCK,
      permission: UPDATE_ASSIGNED_CROP_TO_BLOCK,
      isDependedAction: true,
    },
    {
      label: 'Delete Assigned Crop',
      icon: 'bx bx-trash',
      actionKey: ACTION_DELETE_CROP_ASSIGNED_TO_BLOCK,
      permission: DELETE_ASSIGNED_CROP_TO_BLOCK,
      isDependedAction: true,
    },
    {
      label: 'Plantation History',
      icon: 'bx bx-notepad',
      actionKey: ACTION_BLOCK_PLANTATION_HISTORY,
      permission: READ_ASSIGNED_CROP_TO_BLOCK,
    },
  ];

  return (
    <>
      {data && data.length > 0 && canCreateBlock && (
        <Row>
          <Col>
            <div className="float-end d-flex gap-1 flex-wrap mb-2">
              <Button
                variant="secondary"
                className="btn btn-secondary btn-sm"
                onClick={toggleModal}>
                <i className="bx bx-plus" />
                Add Block
              </Button>
            </div>
          </Col>
        </Row>
      )}

      {data && data.length > 0 ? (
        <Row>
          <Col>
            <div className="blocks-list">
              <Accordion
                defaultActiveKey={activeEventKey || '0'}
                id="accordion"
                className="custom-accordion d-flex flex-column gap-1">
                {data.map((item, index) => (
                  <div className="custom-accordion-item me-1" key={item.id}>
                    <CustomToggle
                      eventKey={String(index)}
                      containerClass="d-flex justify-content-between align-items-center gap-1 pe-2"
                      linkClass="d-block"
                      item={item}
                      dropdownMenuItems={menuItems}
                      refetchBlocks={refetchBlocks}
                      toggleAccordion={toggleAccordion}
                    />
                    <Accordion.Collapse eventKey={String(index)}>
                      <div className="accordion-item-wrapper">
                        {String(index) === activeEventKey && (
                          <BlockContent blockDetail={item} />
                        )}
                      </div>
                    </Accordion.Collapse>
                  </div>
                ))}
              </Accordion>
            </div>
          </Col>
        </Row>
      ) : (
        <Card>
          <Card.Body>
            <NoDataAvailable
              wrapperClass="mb-1"
              message="No blocks available under this paddock"
            />
            {canCreateBlock && (
              <Row>
                <Col>
                  <div className="d-flex justify-content-center align-items-center mb-1">
                    <Button
                      variant=""
                      className="btn btn-sm border-dashed-success text-secondary"
                      onClick={toggleModal}>
                      <i className="bx bx-plus" />
                      <span>Add Block</span>
                    </Button>
                  </div>
                </Col>
              </Row>
            )}
          </Card.Body>
        </Card>
      )}

      <AddBlockModal
        showModal={showModal}
        toggleModal={toggleModal}
        refetchBlocks={refetchBlocks}
      />
    </>
  );
};

export default ListBlocks;
