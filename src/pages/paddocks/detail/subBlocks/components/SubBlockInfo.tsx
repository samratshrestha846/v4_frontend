import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { SubBlock } from '../../../../../types/horticulture/subBlock';
import CustomActionsDropdown from '../../blocks/components/CustomActionsDropdown';
import { CustomDropdownMenuItem } from '../../../../../types/common';
import { formattedShortDate } from '../../../../../helpers';

type Props = {
  subBlock?: SubBlock;
  refetchSubBlocks?: () => void;
  actionMenuItems: CustomDropdownMenuItem[];
};

const SubBlockInfo: React.FC<Props> = ({
  subBlock,
  refetchSubBlocks,
  actionMenuItems,
}) => {
  return (
    <div className="sub-block-item p-2">
      <Row className="d-flex">
        <Col>
          <Row>
            <Col sm={6} md={3}>
              <h6 className="font-14">Sub Block Name</h6>
              <p className="text-sm lh-150">{subBlock?.name ?? '-'}</p>
            </Col>

            <Col sm={6} md={3}>
              <h6 className="font-14">Area in Hectares</h6>
              <p className="text-sm lh-150">
                {subBlock?.area_in_hectares ?? '-'}
              </p>
            </Col>

            <Col sm={6} md={3}>
              <h6 className="font-14">Crop Name</h6>
              <p className="text-sm lh-150">
                {subBlock?.cropable?.crop?.name ?? '-'}
              </p>
            </Col>

            <Col sm={6} md={3}>
              <h6 className="font-14">Crop Stage</h6>
              <p className="text-sm lh-150">
                {subBlock?.crop_life_cycle_stage?.crop_stage_name ?? '-'}
              </p>
            </Col>

            <Col sm={6} md={3}>
              <h6 className="font-14">Started On</h6>
              <p className="text-sm lh-150">
                {subBlock?.cropable?.date_from
                  ? formattedShortDate(subBlock?.cropable?.date_from)
                  : '-'}
              </p>
            </Col>

            <Col sm={6} md={3}>
              <h6 className="font-14">No. of Plants</h6>
              <p className="text-sm lh-150">
                {subBlock?.cropable?.number_of_plants ?? '-'}
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="sub-block-actions pe-2">
        <CustomActionsDropdown
          menuItems={actionMenuItems}
          containerClass="custom-dropdown d-flex align-items-center justify-content-between text-white"
          iconColorClass="text-gray"
          subBlock={subBlock}
          refetchSubBlocks={refetchSubBlocks}
          isSubBlockMenu
        />
      </div>
    </div>
  );
};

export default SubBlockInfo;
